//-------ROLES TABLE CONTROLLER (CRUD)

// --MODEL
const { tbregister } = require("../Models/Registration");


//Method -------  POST
//Api   --------  http://localhost:5000/register
//Description --  CREATE REGISTER ACCOUNT FUNCTION


//---import bcrypt
const bcrypt = require('bcrypt');

async function createRegisterAccount(req, res) {
  const {
    userName,
    userEmail,
    userPassword,
    userRole,
    // userImage
  } = req.body;
  const userImage = req.file;
  console.log(userImage);
  // return res.send({"data" : userImage})
  const User_Image = userImage.path;
  const fileID = userImage.filename;
  const checkData = await userData.find({ userEmail: userEmail });
  if (checkData.length > 0) return res.send({ error: "Email already Exists" });
  const namePattern = /^[A-Za-z]{3,}$/; // only alphabets more then 3 letter
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/; // Only gmail, yahoo, hotmail
  //   const imagePattern = /^(http|https):\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif)$/; // URL pattern for images
  //   const rolePattern = /^[A-Za-z]+$/;
  if (namePattern.test(userName)) {
    if (emailPattern.test(userEmail)) {
      const PasswordHash = await bcrypt.hash(userPassword, 10); //----Password Hash
      try {
        const Data = await userData.create({
          userName: userName,
          userEmail: userEmail,
          userImage: User_Image,
          userImageID: fileID,
          userPassword: PasswordHash,
          userRole: userRole,
        });
        return res.status(201).send({ data: req.body }); //----Successfull
      } catch (error) {
        //-----might be Validation Error
        return res.status(204).send({ error: error.errors });
      }
    } else {
      return res
        .status(403)
        .send({ error: "Only gmail, yahoo, hotmail  accepted" });
    }
  } else {
    return res
      .status(403)
      .send({
        error:
          "Name should contain only Alphabets, length should be more than 3 letters ",
      });
  }
}


//Method -------  GET
//Api   --------  http://localhost:5000/register
//Description -- GET REGISTER ACCOUNT FUNCTION



async function getRegisterAccount(req, res) {
    const all_account = await  tbregister.find()

    return res.status(200).send({ "data": all_account })
}



//Method -------  GET
//Api   --------  http://localhost:5000/register/userName
//Description -- UPDATE REGISTER ACCOUNT FUNCTION

// const bcrypt = require("bcrypt");

async function updateRegisterAccount(req, res) {
  const ID = req.params.id;
  const oldData = await tbregister.find({ _id: ID });

  // Check if user exists
  if (oldData.length === 0) {
    return res.status(404).send({ error: "User not found!" });
  }

  const { userName, userEmail, userImage, userPassword, userRole } = req.body;

  const namePattern = /^[A-Za-z\s]{4,}$/;
 // Only alphabets and length > 3
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/; // Only gmail, yahoo, hotmail

  // Hash password
  const PasswordHash = await bcrypt.hash(userPassword, 10);

  if (!namePattern.test(userName)) {
    return res
      .status(500)
      .send(
        "Name should contain only Alphabets, length should be more than 3 letters"
      );
  }

  if (!emailPattern.test(userEmail)) {
    return res.status(500).send("Only gmail, yahoo, hotmail accepted");
  }

  try {
    const updateData = await tbregister.updateOne(
      { _id: oldData[0]._id },
      {
        $set: {
          userName,
          userEmail,
          userImage,
          userPassword: PasswordHash,
          userRole,
        },
      }
    );

    if (updateData.modifiedCount > 0) {
      return res.status(200).send({ data: "User Data Updated" });
    } else {
      return res
        .status(500)
        .send({ error: "No changes were made to the user data." });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}



// Method ------- DELETE
// Api   -------- http://localhost:5000/register/:id
// Description -- DELETE REGISTER ACCOUNT FUNCTION



async function deleteRegisterAccount(req, res) {
  const { id } = req.params; // Get user ID from URL params

  // Check if the user exists
  const userExist = await tbregister.findById(id);
  if (!userExist) {
    return res.status(404).send({ error: "User not found" });
  }

  // Perform the delete operation
  try {
    const deletedUser = await tbregister.findByIdAndDelete(id);
    if (deletedUser) {
      return res.status(200).send({
        message: "User deleted successfully",
        deletedUser: {
          _id: deletedUser._id,
          userName: deletedUser.userName,
          userEmail: deletedUser.userEmail,
          userRole: deletedUser.userRole,
        },
      });
    } else {
      return res.status(400).send({ error: "User could not be deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
  }
}

//--EXPORT FUNCTIONS
module.exports = {
  getRegisterAccount,
  createRegisterAccount,
  updateRegisterAccount,
  deleteRegisterAccount,
};
