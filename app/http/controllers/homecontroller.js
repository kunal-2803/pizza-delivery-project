const Menu = require("../../models/menu");
exports.index = async function index(req,res){
    const pizzas = await Menu.find();
        console.log(pizzas);
        res.render("home",{pizzas:pizzas});
};

