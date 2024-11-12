const express = require("express");
const app = express();

//----------env connect
require("dotenv").config();

// --- MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----db connect
const { connectionDB } = require("./Config/Database");

//--------------------------ROLES ROUTES -----------------

//--- MODELS IMPORT
const { createRoles, getRoles } = require("./Controllers/RolesController");

//--- ROLES API ROUTE      GET      CREATE
app.route("/roles").get(getRoles).post(createRoles);

//--------------------------ACCOUNT ROUTES -----------------

//--- MODELS IMPORT
const {
  getRegisterAccount,
  createRegisterAccount,
  updateRegisterAccount,
  deleteRegisterAccount,
} = require("./Controllers/RegisterController");

//--- ROLES API ROUTE      GET      CREATE
app.route("/register").get(getRegisterAccount).post(createRegisterAccount);
//--- ROLES API ROUTE      DELETE               EDIT
app
  .route("/register/:id")
  .delete(deleteRegisterAccount)
  .put(updateRegisterAccount);

//--------server listen

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionDB(); // invoking DB
});
