import React, { useState, useEffect } from "react";

const CreateAccount = () => {
  //-------Roles
  const [Roles, setRoles] = useState([]);

 useEffect(() => {
   const fetchingRoles = async () => {
     try {
       const response = await fetch("http://localhost:5000/roles");
       const fetchRoles = await response.json();
       console.log("Fetched roles:", fetchRoles); // Log to see the API response structure
       if (response.status === 200) {
         setRoles(fetchRoles.data || fetchRoles); // Adjust according to actual structure
       }
     } catch (error) {
       console.log("Error fetching roles:", error); // Check for any errors
     }
   };
   fetchingRoles();
 }, []);

  //--------input fields
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [UserImage, setUserImage] = useState("");

  //----image
    const [IMG, setIMG] = useState("");
    const handleImageChange = (e) => {
      setIMG(URL.createObjectURL(e.target.files[0]));
      setUserImage(e.target.files[0]);
    };

  // const HandleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     UserName === "" ||
  //     UserEmail === "" ||
  //     UserRole === "none" ||
  //     UserPassword === "" ||
  //     UserImage === ""
  //   ) {
  //     alert("Fill the form first!");
  //   } else {
  //     const newUser = {
  //       userName: UserName,
  //       userEmail: UserEmail,
  //       userImage: UserImage,
  //       userPassword: UserPassword,
  //       userRole: UserRole,
  //     };
  //     try {
  //       const Response = await fetch("http://localhost:5000/register", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(newUser),
  //       });
  //       if (Response.ok) {
  //         //-------Respone.status ===201
  //         alert("User Added");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error); // Log the error for debugging purposes
  //       alert("Something went wrong. Please try again.");
  //     }
  //   }
  // };


    const HandleSubmit = async (e) => {
      e.preventDefault();

      // console.log(UserImage)
      if (
        UserName === "" ||
        UserEmail === "" ||
        UserRole === "none" ||
        UserPassword === "" ||
        UserImage === ""
      ) {
        alert("Fill the form first!");
      } else {
        const formData = new FormData();
        formData.append("userName", UserName);
        formData.append("userEmail", UserEmail);
        formData.append("userPassword", UserPassword);
        formData.append("userRole", UserRole);
        formData.append("userImage", UserImage);
        // const newUser ={
        //     userName : UserName,
        //     userEmail : UserEmail,
        //     userImage : UserImage,
        //     userPassword : UserPassword,
        //     userRole : UserRole
        // }
        try {
          const Response = await fetch("http://localhost:5000/register", {
            method: "POST",
            // headers: {
            //     'Content-Type': "application/json"
            //   },
            body: formData,
          });
          const ch = await Response.json();
          console.log(ch);
          if (Response.status === 201) {
            //-------Respone.status ===201
            // toast.success("Role Added")
            alert("Account Registered!!!");
          } else {
            alert(ch);
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
                    <form
                      encType="multipart/form-data"
                      onSubmit={HandleSubmit}
                      className="w-50 mx-auto col-lg-6 col-md-8 col-sm-10"
                    >
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
                          onChange={(e) => handleImageChange(e)}
                          type="file"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      {/* ----- */}
                      <div className="mb-3 mt-2">
                        {IMG === "" ? (
                          <div
                            style={{
                              backgroundColor: "#98939378",
                              width: "100px",
                              height: "100px",
                              color: "grey",
                              fontSize: "13px",
                            }}
                            className="px-3 py-4 text-center"
                          >
                            No Image selected
                          </div>
                        ) : (
                          <img
                            style={{ maxWidth: "120px" }}
                            alt=""
                            className=" img-thumbnail "
                            src={IMG}
                          />
                        )}
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
