exports.login = async function login(req,res){
    res.render("auth/login")
};

exports.register = async function register(req,res){
    res.render("auth/register")
};