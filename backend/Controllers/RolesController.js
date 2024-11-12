// //-------ROLES TABLE CONTROLLER (CRUD)

// // --MODEL
// const { tbroles } = require("../Models/Role");
// // const { registration } = require("../Models/UserAccount");


// //Method -------  POST
// //Api   --------  http://localhost:5000/roles
// //Description --  CREATE ROLES FUNCTION

// async function createRoles(req,res) {
//   const { role_name, status } = req.body;

//   //--- role_name exist find()
//   const role_nameExist = await tbroles.find({
//     "role_name": role_name.toLowerCase(),
//   });

//   //--- role validate using regex
//   const role_nameChecker = /^[A-Za-z]+$/;
// //if
//   if (role_nameChecker.test(role_name)) {
//     if (role_nameExist.length > 0)
//       return res.send({ error: "Already added this role" });
//     const newRole = await tbroles.create({
//       role_name: role_name.toLowerCase(),
//       status: status,
//     });

//     return res.status(201).send({ "data": req.body });
//   }

//   //else
// else{
//     return res.status(500).send({"error":"Special character,numbers and extra spaces are not allowed!!"})
// }
// }



// //Method -------  GET
// //Api   --------  http://localhost:5000/roles
// //Description -- GET ROLES FUNCTION



// async function getRoles(req, res) {
//     const all_roles = await  tbroles.find()

//     return res.status(201).send({ "data": all_roles })
// }



// //--EXPORT FUNCTIONS
// module.exports = { createRoles ,getRoles};












//-------ROLES TABLE CONTROLLER (CRUD)

// --MODEL
const { tbroles } = require("../Models/Role");

// Method -------  POST
// API   --------  http://localhost:5000/roles
// Description --  CREATE ROLES FUNCTION

async function createRoles(req, res) {
  const { role_name, status } = req.body;

  // Regular expression to validate role_name
  const role_nameChecker = /^[A-Za-z]+$/;

  // Validation for role_name using regex
  if (!role_nameChecker.test(role_name)) {
    return res
      .status(400) // Bad Request for invalid input
      .send({ error: "Special characters, numbers, and extra spaces are not allowed in role names." });
  }

  try {
    // Check if role already exists
    const roleExists = await tbroles.findOne({ role_name: role_name.toLowerCase() });

    if (roleExists) {
      return res.status(409).send({ error: "Role already exists." });
    }

    // Create the new role
    const newRole = await tbroles.create({
      role_name: role_name.toLowerCase(),
      status: status,
    });

    return res.status(201).send({ data: newRole }); // Return created role data
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
}

// Method -------  GET
// API   --------  http://localhost:5000/roles
// Description -- GET ROLES FUNCTION

async function getRoles(req, res) {
  try {
    const all_roles = await tbroles.find();
    return res.status(200).send({ data: all_roles }); // Use 200 status for a successful GET request
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
}

// --EXPORT FUNCTIONS
module.exports = { createRoles, getRoles };
