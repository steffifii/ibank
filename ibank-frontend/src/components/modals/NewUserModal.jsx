import React, { useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";

const NewBookModal = ({ isNewUserMode, setIsNewUserMode, API_ENDPOINT }) => {

    const handleAddUser = e => {
        const newUser = {
            name: e.target.name.value,
            password: e.target.password.value,
            email: e.target.email.value,
            address: e.target.address.value,
            gender: e.target.gender.value,
            birthdate: e.target.birthdate.value
        }
        console.log("newUser: ", newUser)
        axios({
            method: "post",
            url: `${API_ENDPOINT}/users/register`,
            data: newUser
        })
            .then(res => {
                console.log(`User with email ${newUser.email} created successfully. `, res);
            })
            .catch(err => console.error(`Error creating user with email ${newUser.email}: `, err));
    }

    useEffect(() => {
        ReactModal.setAppElement("#root");
    }, []);

    return(
    <ReactModal isOpen={isNewUserMode} closeTimeoutMS={200}>
        <i className="fa-solid fa-xmark position-absolute end-0 pe-3" onClick={()=>setIsNewUserMode(false)} style={{ cursor: 'pointer' }}></i>
        <h4 className="position-absolute start-50 translate-middle-x">Register New User</h4>
        <div className="">
            <form className="text-center w-100" onSubmit={e=>handleAddUser(e)}>
                <div className="row py-0 pt-5 mt-4 mx-sm-5 px-sm-5">
                    <div className="col-sm-6">
                        <p>
                            <label htmlFor="register-name-input">Full name: </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="register-name-input" name="name" maxLength="100" required/>
                        </p>
                        <p>
                            <label htmlFor="register-gender-input">Gender: </label> <br />
                            <select id="register-gender-input" name="gender" className="rounded-4 ps-sm-2" required>
                            <option className="text-center text-md-start" value=""></option>
                            <option className="text-center text-md-start" value="Female">Female</option>
                            <option className="text-center text-md-start" value="Male">Male</option>
                            <option className="text-center text-md-start" value="Other">Other</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="register-address-input">Address: </label> <br />
                            <textarea type="address" className="text-center text-md-start ps-sm-2 rounded-4" id="register-address-input" name="address" maxLength="255" title="Please enter a valid address (maximum 255 characters)" required/>
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <p>
                            <label htmlFor="register-birthdate-input">Birthdate: </label> <br />
                            <input type="date" className="text-center text-md-start ps-sm-2 rounded-4" id="register-birthdate-input" name="birthdate" title="Please enter your full name" required/>
                        </p>
                        <p>
                            <label htmlFor="register-email-input">Email: </label> <br />
                            <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="register-email-input" name="email" title="Please enter a valid email address" required/>
                        </p>
                        <p>
                            <label htmlFor="register-password-input">Password: </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="register-password-input" name="password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" title="Password must be at least 8 characters and contain letters and numbers" required/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-success rounded-5 mt-4" type="submit"><i className="fa-solid fa-check"></i></button>
            </form>
        </div>
    </ReactModal>
    )
}

export default NewBookModal;