const cartControllers = require("../Controller/cart.controller");
const { checkToken }= require("../Services/passport.service");

module.exports = app => {
    app.post("/api/addCart", cartControllers.addCart);
    app.get("/api/fetchCart",cartControllers.fetchCart);
    app.put("/api/updateCart/:cart_id", cartControllers.updateCart);
    app.put("/api/deleteCart/:cart_id", cartControllers.deleteCart);
}
