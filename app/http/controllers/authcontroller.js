const User = require('../../models/user')
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const passport = require("passport");
function authController() {

    return {
        login(req, res) {
            res.render('auth/login')
        },

        postLogin(req,res,next){
            const { email, password }   = req.body
             // Validate request 
             if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req,res){
            // res.send("hello")
            const {name ,email ,password} = req.body
            // console.log(req.body);
             // Validate request 
         if(!name || !email || !password) {
            req.flash('error', 'All fields are required')
            console.log("HEOOL err");
            req.flash('name', name)
            req.flash('email', email)
            res.redirect('/register')
        }

                 // Check if email exists 
                 User.exists({ email: email }, (err, result) => {
                    if(result) {
                       req.flash('error', 'Email already taken')
                       req.flash('name', name)
                       req.flash('email', email) 
                        res.redirect('/register')
                    }
                })
       
                // Hash password 
                const hashedPassword = await bcrypt.hash(password, 10)
                // Create a user 
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })
       
                user.save().then((user) => {
                   // Login
                   res.redirect('/')
                }).catch(err => {
                   req.flash('error', 'Something went wrong')
                        res.redirect('/register')
                })


        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }

    }
}
module.exports = authController