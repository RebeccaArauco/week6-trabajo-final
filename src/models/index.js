const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

//Product-Category relation
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart - User relation
Cart.belongsTo(User)
User.hasMany(Cart)

//Product - Cart relation
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase - Product relation
Purchase.hasMany(Product)
Product.belongsTo(Purchase)