# Demo tích hợp ZaloPay cho Nodejs

Demo tích hợp các API của ZaloPay cho nodejs

## Cài đặt

1. [front-end](https://github.com/tiendung1510/zlp-demo-frontend)
2. [ngrok](https://ngrok.com/download)
3. [mysql](https://www.mysql.com/downloads/)
4. [nodejs](https://nodejs.org/en/)
5. [yarn](https://yarnpkg.com/en/docs/install) (optional)
6. Clone project này về và cài đặt các dependencies

```bash
git clone https://github.com/tiendung1510/zlp-demo-nodejs

cd zlp-demo-nodejs

npm install

# or

yarn install
```

6. Tạo một database mới (`utf8_unicode_ci`) trong mysql và thay đổi connection string trong `config.json`

```json
{
  "db": {
    "connstring": "mysql://<username>:<password>@localhost:3306/<dbname>"
  }
}
```

## Chạy Project

1. Chạy phần front-end
2. Tạo ngrok public url cho localhost:1789

```bash
ngrok http 1789 # tạo ngrok public url
```

3. Chạy project

```bash
npm run start # port 1789

# or

yarn start # port 1789
```

## Thay đổi App Config

Khi muốn thay đổi app config (appid, key1, key2, publickey, privatekey), để nhận được callback ở localhost thì **Merchant Server** cần xử lý forward callback như sau:

1. Khi nhận được callback từ ZaloPay Server, lấy **ngrok public url** trong `embeddata.forward_callback` của callback data:

```json
{
  "embeddata": {
    "forward_callback": "<ngrok public url khi chạy lệnh `ngrok http 1789`>"
  }
}
```

2. Post callback data (`application/json`) cho **ngrok public url** vừa lấy

## Các API tích hợp trong demo

* Xử lý callback
* Thanh toán QR
* Cổng ZaloPay
* QuickPay
* Mobile Web to App
* Hoàn tiền
* Lấy trạng thái hoàn tiền