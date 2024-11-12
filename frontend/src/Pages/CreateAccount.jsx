import React, { useState, useEffect } from "react";

const CreateAccount = () => {
  //-------Roles
  const [Roles, setRoles] = useState([]);

  useEffect(() => {
    // ----Fetching roles from backend
    const fetchingRoles = async () => {
      try {
        const Response = await fetch("http://localhost:5000/roles");
        const fetchRoles = await Response.json();
        if (Response.status === 200) {
          // Use status 200 for successful request
          setRoles(fetchRoles); // Ensure you are using the correct data structure here
        }
      } catch (error) {
        console.log({ Error: error });
      }
    };
    fetchingRoles();
  }, [Roles]); // Empty dependency array ensures the effect runs only once when the component mounts.

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
        const Response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (Response.status === 201) {
          //-------Respone.status ===201
          alert("User Added");
        }
      } catch (error) {
        alert(error);
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
                    <form onSubmit={HandleSubmit} className="w-50">
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
                            Roles.map((data, index) => {
                              return (
                                <option key={index} value={data.role_name}>
                                  {data.role_name}
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
