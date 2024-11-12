import React, { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap"; // Import Modal from Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Account = () => {
  const [Fetchaccount, setFetchaccount] = useState([]);
  // const [Roles, setRoles] = useState([]);
  // FETCHING ACCOUNT DATA USING API
  useEffect(() => {
    const handlefetchRoles = async () => {
      try {
        const Response = await fetch("http://localhost:5000/register");
        if (Response.ok) {
          const Accountdata = await Response.json();
          setFetchaccount(Accountdata.data);
          console.log("list:", Accountdata);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    handlefetchRoles();
  }, []); // Empty dependency array to prevent infinite loop

  // DELETE REGISTRE USING API
  const DeleteAccount = async (id, userName) => {
    // Ask for confirmation before proceeding with deletion
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the account "${userName}"?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/register/${id}`, // Correctly append the ID to the URL
          {
            method: "DELETE",
          }
        );

        if (response.status === 200) {
          alert(`Account "${userName}" has been deleted successfully.`);
        } else {
          console.log("Failed to delete the account.");
        }
      } catch (error) {
        console.log("Error deleting account:", error);
      }
    } else {
      console.log("Account deletion canceled.");
    }
  };

  // UPDATE ACCOUNT USING API
  const [UserID, setUserID] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [UserImage, setUserImage] = useState("");
  const modalRef = useRef(null);
  const updateModal = (ID, name, email, role, password, image) => {
    setUserID(ID);
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    // setUserPassword(password)
    setUserImage(image);
    const modalInstance = new Modal(modalRef.current);
    modalInstance.show();
  };
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
      const updateData = {
        userName: UserName,
        userEmail: UserEmail,
        userImage: UserImage,
        userPassword: UserPassword,
        userRole: UserRole,
      };

      try {
        setUserPassword(""); // Reset password field after submission
        const response = await fetch(`http://localhost:5000/${UserID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        const modalInstance = Modal.getInstance(modalRef.current);
        modalInstance.hide(); // Hide modal after submission

        if (response.ok) {
          alert("Role Updated");
        } else {
          const checkError = await response.json();
          alert(checkError.error || "Error updating role.");
        }
      } catch (error) {
        setUserPassword(""); // Reset password field in case of error
        alert(error.message || "An error occurred.");
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div className="container-fluid">
                <h1 className="h3 mb-3 text-gray-800">Accounts</h1>
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <Link
                      type="button"
                      to="/CreateAccount"
                      className="btn btn-primary btn-sm float-right"
                      data-toggle="modal"
                      data-target="#addEventModal"
                    >
                      <i className="fa fa-plus"></i> Add New
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center">SL</th>
                            <th className="text-center">Username</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Fetchaccount.length > 0 ? (
                            Fetchaccount.map((data, index) => {
                              const i = index + 1;
                              return (
                                <tr key={data._id || i}>
                                  <td className="text-center">{i}</td>
                                  <td className="text-center">
                                    {data.userName}
                                  </td>
                                  <td className="text-center">
                                    {data.userEmail}
                                  </td>
                                  <td className="text-center">
                                    {data.userRole}
                                  </td>
                                  <td className="text-center">
                                    <img
                                      src={data.userImage}
                                      alt="User"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </td>
                                  <td className="text-center">
                                    <button
                                      onClick={() =>
                                        updateModal(
                                          data._id,
                                          data.userName,
                                          data.userEmail,
                                          data.userRole,
                                          data.userPassword,
                                          data.userImage
                                        )
                                      }
                                      className="btn btn-primary btn-sm"
                                    >
                                      <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-danger"
                                      onClick={() =>
                                        DeleteAccount(data._id, data.userName)
                                      } // Pass both id and userName
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No Accounts found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Update Modal */}
        <div id="modal_" class="modal fade" ref={modalRef} tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <form className="w-75" onSubmit={HandleSubmit}>
              <div class="modal-content">
                <div class="modal-header px-4">
                  <h4 class="modal-title text-center">Update Role</h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body p-4">
                  <div className="mb-3 mt-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      value={UserName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3 mt-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      value={UserEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3 mt-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Image
                    </label>
                    <input
                      value={UserImage}
                      onChange={(e) => setUserImage(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3 mt-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Role
                    </label>
                    <select
                      value={UserRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      name=""
                      id=""
                      className="form-select"
                    >
                      <option value="none">Select Role</option>
                      {Fetchaccount.map((data, index) => {
                        return (
                          <option value={data.Rolename}>
                            {data.role_name}
                          </option>
                        );
                      })}
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
                      value={UserPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-primary"
                  >
                    Add Data
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
