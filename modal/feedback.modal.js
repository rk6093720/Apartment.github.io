const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    description: { type: String },
},
{
  timestamps:true  
})
const FeedbackModal = mongoose.model("feedback", feedbackSchema);
module.exports = {
    FeedbackModal
}