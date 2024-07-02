const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
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

//Purchase - User relation
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase - Product relation
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProductImg - Product relation
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)
