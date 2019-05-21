const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./provider');
const OrderRespository = require('./respository/OrderRepository');
const enableWS = require('express-ws');
const morgan = require('morgan');
const cors = require('cors');
const ZaloPay = require('./zalopay');

sequelize.sync()
.then(() => {
  morgan.token('reqdata', (req, res) => {
    return JSON.stringify(req.method === 'POST' ? req.body : req.query);
  });
  
  const app = express();
  app.use(morgan(':method :url :status :reqdata :res[content-length] - :response-time ms'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/api', require('./routes/api'));
  
  enableWS(app);

  const hub = new Map();
  
  app.ws('/subscribe', (ws, req) => {
    const { apptransid } = req.query;
    hub.set(apptransid, ws);
    ws.on('close', () => {
      hub.delete(apptransid);
    });
  });
  
  app.post('/callback', (req, res) => {
    const { data: dataStr, mac } = req.body;
    const result = ZaloPay.VerifyCallback(dataStr, mac);
  
    if (result.returncode !== -1) {
      const data = JSON.parse(dataStr);
      const { apptransid } = data;
      hub.get(apptransid).send(dataStr);
      OrderRespository.SaveOrder(data);
    }
  
    res.send(result);
  });
  
  const PORT = 1789;

  app.listen(PORT, () => {
    console.log('[App] Listen at port :' + PORT);
  });
});
