const router = require('express-promise-router')();
const ZaloPay = require('../zalopay');
const OrderRespository = require('../respository/OrderRepository');

router.post('/createorder', async (req, res) => {
  const { ordertype } = req.query;
  
  switch (ordertype) {
    case 'gateway':
      return res.send(await ZaloPay.Gateway(req.body));
    case 'quickpay':
      return res.send(await ZaloPay.QuickPay(req.body));
    default:
      return res.send(await ZaloPay.CreateOrder(req.body));
  }
});

router.post('/refund', async (req, res) => {
  res.send(await ZaloPay.Refund(req.body));
});

router.get('/getrefundstatus', async (req, res) => {
  const { mrefundid } = req.query;
  res.send(await ZaloPay.GetRefundStatus(mrefundid));
});

router.get('/getbanklist', async (req, res) => {
  res.send(await ZaloPay.GetBankList());
});

router.get('/gethistory', async (req, res) => {
  let { page } = req.query;
  page = Number(page);
  page = isNaN(page) ? 1 : page;

  const orders = await OrderRespository.Paginate(page);
  res.send(orders);
});

module.exports = router;