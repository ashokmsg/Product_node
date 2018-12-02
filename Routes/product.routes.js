const ProductControllers = require("../Controller/product.controller");
//const { checkToken }= require("../Services/passport.service");

module.exports = app => {
    app.get("/api/sampleSearch", ProductControllers.sampleSearch);
    app.post("/api/addProduct", ProductControllers.addProduct);
    app.put("/api/updateProduct/:product_id", ProductControllers.updateProduct);
    app.put("/api/deleteProduct/:product_id", ProductControllers.deleteProduct);
}