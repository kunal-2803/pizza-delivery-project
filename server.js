require('dotenv').config()
const express = require("express");
const app = express();
const Port = process.env.PORT || 3000;
const path = require("path");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")
const passport  = require("passport");
const Emitter = require('events');
require("./conn");
// const connection = "mongodb://localhost:27017/pizza";
const webrout = require('./routes/web');
const temp_views = path.join(__dirname,"./resources/views");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


//sessions
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:MongoDbStore.create({
        mongoUrl: process.env.DATABASE
      }),
    saveUninitialized:false,
    cookie: {maxAge: 100*60*60*24}
}))


// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());

app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next();
})

app.use(expressLayout);
app.set("view engine","ejs");
app.set("views",temp_views);


app.use(webrout);


//assets
const static_path = path.join(__dirname,"./public");
app.use(express.static(static_path));

app.use((req, res) => {
    res.status(404).render('errors/404')
})


const server = app.listen(Port,()=>{
    console.log(`Listening to server at http://localhost:${Port}`)
});

//socket
const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})


