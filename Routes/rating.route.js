const RatingControllers = require("../Controller/rating.controller");
const { checkToken }= require("../Services/passport.service");

module.exports = app => {
    app.get("/api/userHistory/:user_id", RatingControllers.userHistory);
    app.get("/api/productHistory/:product_id", RatingControllers.productHistory);
    app.get("/api/adminHistory", RatingControllers.adminHistory);
    app.post("/api/insertRatingTable", RatingControllers.insertRating);
    app.put("/api/updateLikes/:review_id", RatingControllers.updateLikes);
    app.put("/api/updateDislikes/:review_id", RatingControllers.updateDislikes);
}