const { Router } = require("express");;
const { getFeedback, postFeedback, putfeedback, deleteFeedback } = require("../controller/feedback.controller");

const feedbackRoute = Router();
feedbackRoute.get("/read", getFeedback)

feedbackRoute.post("/create", postFeedback);

feedbackRoute.put("/update/:id", putfeedback);

feedbackRoute.delete("/remove/:id", deleteFeedback)

module.exports = {
    feedbackRoute
}