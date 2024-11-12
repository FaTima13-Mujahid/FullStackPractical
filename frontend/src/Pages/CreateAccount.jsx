import React, { useState, useEffect } from "react";

const CreateAccount = () => {
  //-------Roles
  const [Roles, setRoles] = useState([]);

  useEffect(() => {
    // ----Fetching roles from backend
    const fetchingRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles");
        const fetchRoles = await response.json();
        if (response.status === 200) {
          setRoles(fetchRoles.data); // Ensure the response structure matches the API
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    };
    fetchingRoles();
  }, []); // Empty dependency array

  //--------input fields
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [UserImage, setUserImage] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (
      UserName === "" ||
      UserEmail === "" ||
      UserRole === "none" ||
      UserPassword === "" ||
      UserImage === ""
    ) {
      alert("Fill the form first!");
    } else {
      const newUser = {
        userName: UserName,
        userEmail: UserEmail,
        userImage: UserImage,
        userPassword: UserPassword,
        userRole: UserRole,
      };
      try {
        const Response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (Response.ok) {
          //-------Respone.status ===201
          alert("User Added");
        }
      } catch (error) {
        console.log("Error:", error); // Log the error for debugging purposes
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <h1 className="h3 mb-3 text-gray-800">Accounts</h1>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">Create Account</div>
                  <div className="card-body">
                    <form onSubmit={HandleSubmit} className="w-50 mx-auto col-lg-6 col-md-8 col-sm-10" >
                      <div className="mb-3 mt-2">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 mt-2">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          onChange={(e) => setUserEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 mt-2">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Image
                        </label>
                        <input
                          onChange={(e) => setUserImage(e.target.value)}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 mt-2">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Role
                        </label>
                        <select
                          onChange={(e) => setUserRole(e.target.value)}
                          name=""
                          id=""
                          className="form-select"
                        >
                          <option value="none">Select Role</option>
                          {Roles && Roles.length > 0 ? (
                            Roles.map((list, index) => {
                              return (
                                <option key={index} value={list.role_name}>
                                  {list.role_name}
                                </option>
                              );
                            })
                          ) : (
                            <option>Loading roles...</option>
                          )}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => setUserPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Regiter Here
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
