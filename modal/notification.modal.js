const mongoose = require("mongoose");
const notificationUserSchema = new mongoose.Schema(
  {
    contract: { type: String, enum: ["pending", "completed"] },
    apartmentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "APARTMENT-DETAILS",
      },
    ],
    tentantsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tentant" }],
  },
  { timestamps: true }
);

const NotificationModal = mongoose.model(
  "Notification",
  notificationUserSchema
);
module.exports = {
  NotificationModal,
};
