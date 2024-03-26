// const { mongoose } = require("mongoose");
const { NotificationModal } = require("../modal/notification.modal");
const { TentantModal } = require("../modal/tentant.modal");
const { ApartmentModel } = require("../modal/apartment.modal");
const readNotification = async (req, res) => {
  try {
    const notification = await NotificationModal.find()
      .populate({
        path: "tentantsId",
        model: "Tentant",
      })
      .populate({
        path: "apartmentId",
        model: "APARTMENT-DETAILS",
      });
    // console.log(notification)
    res
      .status(200)
      .json({
        status: "success",
        msg: "notification  got from the admin",
        notification,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "failed",
        msg: `${error.message} or something went wrong`,
      });
  }
};
const postNotification = async (req, res) => {
  const { contract, apartmentId, tentantsId } = req.body;
  try {
    // Check if a notification already exists for the given tentantsId and apartmentId
    const notification = await NotificationModal.findOne({
      tentantsId
    });
    if (notification && notification.contract === "pending") {
      return res.status(400).json({
        status: "failed",
        contract: notification.contract,
        msg: `User has already requested a contract.`,
      });
    } else if (notification && notification.contract === "completed") {
      return res.status(400).json({
        status: "success",
        contract: notification.contract,
        msg: "admin has send notification contract and download contract pdf",
      });
    }  
    // Create a new notification
    const newNotification = new NotificationModal({
      tentantsId,
      contract,
      apartmentId,
    });
    // Use aggregation pipeline to get details from "tentants" collection
    await ApartmentModel.aggregate([
      {
        $match: { _id: apartmentId },
      },
      {
        $lookup: {
          "from": "APARTMENT-DETAILS",
          "localField": "apartmentId",
          "foreignField": "_id",
          "as": "apartmentDetails",
        },
      },
      {
        $unwind: "$apartmentDetails",
      },
      {
        $group: {
          _id: "$_id",
          apartmentDetails: { $push: "$apartmentDetails" },
        },
      },
    ]);
    await TentantModal.aggregate([
      {
        $match: { _id: tentantsId },
      },
      {
        $lookup: {
          "from": "Tentant",
          "localField": "tentantsId",
          "foreignField": "_id",
          "as": "tenantDetails",
        },
      },
      {
        $unwind: "$tenantDetails",
      },
      {
        $group: {
          _id: "$_id",
          tenantDetails: { $push: "$tenantDetails" },
        },
      },
    ]);
    await newNotification.save();
    res.status(200).json({
      status: "success",
      msg: "Notification is created successfully",
      newNotification,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Something went wrong. Please check your connection and try again.",
    });
  }
};

const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { contract, apartmentId, tentantsId } = req.body;
  const updateNotification = {
    contract,
    apartmentId,
    tentantsId,
  };
  try {
    const edit = await NotificationModal.findOneAndUpdate(
      { _id: id },
      updateNotification,
      { new: true }
    );
    res
      .status(200)
      .json({ status: "success", edit, msg: "edited successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: "not edited", error });
  }
};
module.exports = {
  readNotification,
  postNotification,
  updateNotification,
};
