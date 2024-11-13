// //-------ACCOUT REGISTRER TABLE CONTROLLER (CRUD)

//---MODEL IMPORT
const { tbregister } = require("../Models/Registration");
//------bcrypt for password safety
const bcrypt = require("bcrypt");


//---------const cloudinary = require("cloudinary").v2;


const cloudinary = require("cloudinary").v2;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });


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
  const checkData = await tbregister.find({ userEmail: userEmail });
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
        const Data = await tbregister.create({
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


//-------------Method : POST
//---------------API : "http://localhost:5000/register"
//-------------Description : GET ACCOUNT

async function getRegisterAccount(req, res) {
  try {
    const all_account = await tbregister.find();
    return res.status(200).send({ data: all_account });
  } catch (error) {
    return res.status(500).send({ error: "Failed to fetch accounts" });
  }
}

//-------------Method : POST
//---------------API : "http://localhost:5000/register/:id"
//-------------Description : UPDATE ACCOUNT

async function updateRegisterAccount(req, res) {
  const ID = req.params.id;
  const oldData = await tbregister.find({ _id: ID });
  if (oldData <= 0) return res.status(404).send({ error: "Account not found!" });
  const {
    userName,
    userEmail,
    Imagefilename,
    useroldImage,
    userPassword,
    userRole,
  } = req.body;
  const userImage = req.file;
  let User_Image;
  let fileID;
  if (userImage) {
    User_Image = userImage.path;
    fileID = userImage.filename; // Store the file path from the uploaded image
    await cloudinary.uploader.destroy(Imagefilename);
  } else {
    User_Image = useroldImage;
    fileID = Imagefilename;
  }

  const namePattern = /^[A-Za-z]{3,}$/; // only alphabets more then 3 letter
  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/; // Only gmail, yahoo, hotmail
  const PasswordHash = await bcrypt.hash(userPassword, 10); //----Password Hash
  if (namePattern.test(userName)) {
    if (emailPattern.test(userEmail)) {
      try {
        const updateData = await tbregister.updateOne(
          {
            _id: oldData[0]._id,
          },
          {
            $set: {
              userName,
              userEmail,
              userImage: User_Image,
              userImageID: fileID,
              userPassword: PasswordHash,
              userRole,
            },
          }
        );

        return res.status(201).send({ data: "Account Data Updated" });
      } catch (error) {
        // return res.status(204).send({ error: error.errors });
        return res.status(500).send({ error: error.errors });

      }
    } else {
      return res.status(500).send("Only gmail, yahoo, hotmail  accepted");
    }
  } else {
    return res
      .status(500)
      .send(
        "Name should contain only Alphabets, length should be more than 3 letters "
      );
  }
}


//-------------Method : POST
//---------------API : "http://localhost:5000/register/:id"
//-------------Description : DELETE ACCOUNT

async function deleteRegisterAccount(req, res) {
  const ID = req.params.id;
  const { OLDimageID } = req.body;
  const UserData = await tbregister.find({ _id: ID });
  if (UserData <= 0) return res.status(404).send({ error: "User not found!" });
  try {
    const deleteData = await tbregister.deleteOne({
      _id: ID,
    });
    await cloudinary.uploader.destroy(OLDimageID);
    return res.status(201).send({ data: "User Deleted" });
  } catch (error) {
    return res.status(204).send({ error: error });
  }
}


// EXPORT 
module.exports = {
  createRegisterAccount,
  getRegisterAccount,
  updateRegisterAccount,
  deleteRegisterAccount,
};
