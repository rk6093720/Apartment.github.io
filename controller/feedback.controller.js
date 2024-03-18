const { FeedbackModal } = require("../modal/feedback.modal");

const getFeedback = async (req, res) => {
    try {
        const users = await FeedbackModal.find();
        res.status(200).send({ feedback: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postFeedback = async (req, res) => {
    const {
        name,
        email,
        description,
    } = req.body;
    const {_id} = req.params;
    try {
        const feedbackId = _id
        ? await FeedbackModal.findById(_id)  
        : await FeedbackModal.findOne({email});
        if(feedbackId){
            return res.status(400).json({status:"error",msg:"Feedback is already there"})
        }
        const newUser = {
          name,
          email,
          description,
        };
        const newFeedback = new FeedbackModal(newUser);
        await newFeedback.save();
        res.status(201).json({ status: 'success', AddFeedback: newFeedback, msg:"feedback is create successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putfeedback = async (req, res) => {
    const { id } = req.params;
    const { name, email, description, } = req.body;
    const newFeedback = {
        name,
        email,
        description,
    }
    try {
        await FeedbackModal.findOneAndUpdate({ _id: id }, newFeedback, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editFeedback: newFeedback });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteFeedback = await FeedbackModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteFeedback })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports = {
    getFeedback,
    postFeedback,
    putfeedback,
    deleteFeedback
}