import React, { useState, useEffect } from "react";

const Account = () => {
  const [Fetchaccount, setFetchaccount] = useState([]);

  // FETCHING ACCOUNT DATA USING API
  useEffect(() => {
    const handlefetchRoles = async () => {
      try {
        const Response = await fetch("http://localhost:5000/register");
        if (Response.ok) {
          const Accountdata = await Response.json();
          setFetchaccount(Accountdata.data);
          console.log("list:",Accountdata);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    handlefetchRoles();
  }, [Fetchaccount]);

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
                    <button
                      type="button"
                      className="btn btn-primary btn-sm float-right"
                      data-toggle="modal"
                      data-target="#addEventModal"
                    >
                      <i className="fa fa-plus"></i> Add New
                    </button>
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
                                    <button className="btn btn-warning btn-sm mr-2">
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger">
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
      </div>
    </>
  );
};

export default Account;
