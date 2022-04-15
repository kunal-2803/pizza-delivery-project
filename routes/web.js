
const homecontroll = require("../app/http/controllers/homecontroller");

const authcontroll = require("../app/http/controllers/authcontroller");

const cartcontroll = require("../app/http/controllers/customers/cartcontroller");

const express = require("express");
const appp = express.Router();


appp.get('/',homecontroll.index);

appp.get('/cart',cartcontroll.index);

appp.get('/login',authcontroll.login);

appp.get('/register',authcontroll.register);
   


module.exports = appp;