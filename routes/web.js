
const homecontroll = require("../app/http/controllers/homecontroller");
const authcontroll = require("../app/http/controllers/authcontroller");
const cartcontroll = require("../app/http/controllers/customers/cartcontroller");
const ordercontroll = require("../app/http/controllers/customers/ordercontroller");
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const express = require("express");
const appp = express.Router();


appp.get('/',homecontroll.index);

appp.get('/login',guest,authcontroll().login);
appp.post('/login',authcontroll().postLogin);

appp.get('/register',guest,authcontroll().register);
appp.post('/register',authcontroll().postRegister);

appp.post('/logout',authcontroll().logout);

appp.get('/cart',cartcontroll().index);
appp.post("/update-cart",cartcontroll().update);
//customer route
appp.post('/orders',auth,ordercontroll().store)
appp.get('/customer/orders',auth,ordercontroll().index)
   



module.exports = appp;