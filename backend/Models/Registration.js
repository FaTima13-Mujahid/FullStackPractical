const mongoose = require("mongoose");

//-------Registration table
const Registartion_model = mongoose.Schema(
    {
  userName: { type: String,required :[true,"Please enter your name"] },
  userEmail: { type: String,required :[true,"Please enter your email"] },
  userPassword: {  type: String,required :[true,"Please enter your email"]},
  userImage: { type: String,required :[true,"Please submit your image"] },
  userRole: {  type: String,required :[true,"Please enter your role"] }
}
)

//----export
const tbregister = mongoose.model("tbregister", Registartion_model)  //"tbregister"  --tablename



module.exports = {tbregister}
