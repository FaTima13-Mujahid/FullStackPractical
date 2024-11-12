//-------ROLES TABLE CONTROLLER (CRUD)

// --MODEL
const { tbroles } = require("../Models/Role");
// const { registration } = require("../Models/UserAccount");


//Method -------  POST
//Api   --------  http://localhost:5000/roles
//Description --  CREATE ROLES FUNCTION

async function createRoles(req,res) {
  const { role_name, status } = req.body;

  //--- role_name exist find()
  const role_nameExist = await tbroles.find({
    "role_name": role_name.toLowerCase(),
  });

  //--- role validate using regex
  const role_nameChecker = /^[A-Za-z]+$/;
//if
  if (role_nameChecker.test(role_name)) {
    if (role_nameExist.length > 0)
      return res.send({ error: "Already added this role" });
    const newRole = await tbroles.create({
      role_name: role_name.toLowerCase(),
      status: status,
    });

    return res.status(201).send({ "data": req.body });
  }

  //else
else{
    return res.status(200).send({"error":"Special character,numbers and extra spaces are not allowed!!"})
}
}



//Method -------  GET
//Api   --------  http://localhost:5000/roles
//Description -- GET ROLES FUNCTION



async function getRoles(req, res) {
    const all_roles = await  tbroles.find()

    return res.status(200).send({ "data": all_roles })
}



//--EXPORT FUNCTIONS
module.exports = { createRoles ,getRoles};
