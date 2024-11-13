import React, { useEffect, useState } from 'react'

const AddUser = () => {

    //-------Roles
    const [Roles, setRoles] = useState([])
    useEffect(() => {
        // ----Fetching roles from backend
        const fetchingRoles = async () => {
            try {
                const Response = await fetch("http://localhost:5000/roles");
                const fetchRoles = await Response.json()
                if (Response.status === 201) {
                    setRoles(fetchRoles.data)
                }
            } catch (error) {
                console.log({ "Error": error })
            }

        }
        fetchingRoles()
    })

    //--------input fields
    const [UserName, setUserName] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserRole, setUserRole] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [UserImage, setUserImage] = useState("")
    const [IMG, setIMG] = useState("")
    const handleImageChange = (e) => {
        setIMG(URL.createObjectURL(e.target.files[0]));
        setUserImage(e.target.files[0]);
    };


 
    

    return (
        <>
            <div className="container mt-3 d-flex flex-column  align-items-center ">
                <h1 className="text-center mt-3 ">
                    Add User
                </h1>
                <form method='post' enctype="multipart/form-data" onSubmit={HandleSubmit} className='w-50'>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={(e) => setUserEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="row mb-3 mt-2">
                        <div className=" col-9">
                            <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                            <input name='userImage' onChange={(e) => handleImageChange(e)} type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-3 ">
                            {
                                IMG == "" ?
                                    <div style={{
                                        backgroundColor: "#98939378", width: "100px", height: "100px", color: "grey",
                                        fontSize: "13px"
                                    }} className='px-3 py-4 text-center'>
                                        No Image selected
                                    </div>

                                    :
                                    <img style={{ maxWidth: "120px" }} alt="" className=' img-thumbnail ' src={IMG} />
                            }
                        </div></div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Role</label>
                        <select onChange={(e) => setUserRole(e.target.value)} name="" id="" className="form-select">
                            <option value="none">Select Role</option>
                            {
                                Roles.map((data, index) => {
                                    return (
                                        <option value={data.Rolename}>{data.Rolename}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={(e) => setUserPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary "><i className="fa-solid fa-plus"></i> Add User</button>
                </form>
            </div>
        </>
    )
}

export default AddUser