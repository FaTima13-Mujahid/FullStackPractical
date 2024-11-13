import React, { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap"; // Import Modal from Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const Account = () => {
  const [Fetchaccount, setFetchaccount] = useState([]);
  const [Roles, setRoles] = useState([]);

  // FETCHING ACCOUNT DATA USING API
  useEffect(() => {
    const handlefetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/register");
        if (response.ok) {
          const Accountdata = await response.json();
          setFetchaccount(Accountdata.data);
          console.log("list:", Accountdata);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    // Fetching roles from backend
    const fetchingRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/roles");
        const fetchRoles = await response.json();
        if (response.status === 200) {
          setRoles(fetchRoles.data);
        }
      } catch (error) {
        console.log({ Error: error });
      }
    };

    fetchingRoles();
    handlefetchAccounts();
  }, []); // Empty dependency array to prevent infinite loop

  //-------------DELETE ACCOUNT
  const DeleteAccount = async (ID, user_Name) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the account "${user_Name}"?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/register/${ID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert(`Account "${user_Name}" has been deleted successfully.`);
          setFetchaccount(Fetchaccount.filter((account) => account._id !== ID)); // Update the list after deletion
        } else {
          const error = await response.json();
          alert(`Error ${response.status}: ${error.message}`);
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  //------------Update Modal Logic
  const modalRef = useRef(null);
  const [UserID, setUserID] = useState("");
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [UserImage, setUserImage] = useState("");
  const [OldImage, setOldImage] = useState("");
  const [Imagefilename, setImagefilename] = useState("");
  const [IMG, setIMG] = useState("");

  const updateModal = (ID, name, email, role, password, image, oldfilename) => {
    setUserID(ID);
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setIMG(image);
    setOldImage(image);
    setImagefilename(oldfilename);
    const modalInstance = new Modal(modalRef.current);
    modalInstance.show();
  };

  const handleImageChange = (e) => {
    setIMG(URL.createObjectURL(e.target.files[0]));
    setUserImage(e.target.files[0]);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (
      !UserName ||
      !UserEmail ||
      UserRole === "none" ||
      !UserPassword ||
      !UserImage
    ) {
      alert("Please fill all fields.");
      return;
    }

    let updateData;

    if (IMG === OldImage) {
      updateData = {
        userName: UserName,
        userEmail: UserEmail,
        userPassword: UserPassword,
        userRole: UserRole,
        userOldImage: OldImage,
        Imagefilename: Imagefilename,
      };
    } else {
      updateData = new FormData();
      updateData.append("userName", UserName);
      updateData.append("userEmail", UserEmail);
      updateData.append("userPassword", UserPassword);
      updateData.append("userRole", UserRole);
      updateData.append("userImage", UserImage);
      updateData.append("Imagefilename", Imagefilename);
    }

    try {
      const response = await fetch(`http://localhost:5000/register/${UserID}`, {
        method: "PUT",
        body: IMG === OldImage ? JSON.stringify(updateData) : updateData,
        headers:
          IMG === OldImage ? { "Content-Type": "application/json" } : undefined,
      });

      const modalInstance = Modal.getInstance(modalRef.current);
      modalInstance.hide();

      if (response.ok) {
        alert(`User ${UserName} Updated`);
        // Optionally refresh the account list
        const updatedAccount = await response.json();
        setFetchaccount(
          Fetchaccount.map((account) =>
            account._id === UserID ? updatedAccount : account
          )
        );
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <h1 className="h3 mb-3 text-gray-800">Accounts</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <Link
            to="/CreateAccount"
            className="btn btn-primary btn-sm float-right"
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
                        <td className="text-center">{data.userName}</td>
                        <td className="text-center">{data.userEmail}</td>
                        <td className="text-center">{data.userRole}</td>
                        <td className="text-center">
                          <img
                            src={data.userImage}
                            alt="User"
                            style={{
                              width: "100px",
                              height: "100px",
                              border: "2px solid #ccc",
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
                                data.userImage,
                                data.userImage
                              )
                            }
                            className="btn btn-outline-success"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() =>
                              DeleteAccount(data._id, data.userName)
                            }
                            className="btn btn-outline-danger"
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

      {/* Update Modal */}
      <div id="modal_" className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <form
            className="w-75"
            encType="multipart/form-data"
            onSubmit={HandleSubmit}
          >
            <div className="modal-content">
              <div className="modal-header px-4">
                <h4 className="modal-title text-center">Update Role</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3 mt-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 mt-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    value={UserEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 mt-2">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    value={UserPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 mt-2">
                  <label className="form-label">Role</label>
                  <select
                    value={UserRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="form-select"
                  >
                    <option value="none">Select Role</option>
                    {Roles && Roles.length > 0 ? (
                      Roles.map((data, index) => (
                        <option key={index} value={data.role_name}>
                          {data.role_name}
                        </option>
                      ))
                    ) : (
                      <option>No roles available</option>
                    )}
                  </select>
                </div>

                <div className="mb-3 mt-2">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                  {IMG && (
                    <img
                      src={IMG}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
