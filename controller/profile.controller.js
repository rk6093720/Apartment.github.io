const { AdminModal } = require("../modal/admin.modal");
const { ProfileModal } = require("../modal/profile.modal");
const postProfile = async (req, res) => {
  const { adminId }=req.body;
    const id = await AdminModal.findOne({ adminId });
    // console.log(id)
  try {
    // console.log(id, firstName, lastname, phone, country, state, city);
    //   const profileData = {
    //     firstName,
    //     lastname,
    //     country,
    //     state,
    //     city,
    //   };
    // const profile = await ProfileModal(profileData)
    // await profile.save();
    // res.status(200).send({ AddProfile: profile, status: "success"})
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profileData = await ProfileModal.find();
    res.status(200).send({ Profile: profileData, status: "success" });
  } catch (error) {
    res.status(500).send({ status: "error" });
  }
};

module.exports = {
  getProfile,
  postProfile,
};
