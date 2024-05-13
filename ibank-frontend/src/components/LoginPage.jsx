import React, { useContext, useState } from "react";
import axios from "axios";

import { API_ENDPOINT } from "../assets/configuration/config";
import NewUserModal from "./modals/NewUserModal";
import { AuthContext } from "../assets/contexts/AuthContext";

const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const [ logInErrorMessage, setLogInErrorMessage ] = useState("");
    const [ isNewUserMode, setIsNewUserMode ] = useState(false);

    const handleLogIn = e => {
        e.preventDefault();

        const loginCredentials = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        login({ 
            email: loginCredentials.email, 
            role: "Teller" 
        });

        // dummy log in
    
        axios({
            method: "post",
            url: `${API_ENDPOINT}/login`,
            data: loginCredentials
        })
        .then(res=>{
            if(res.data==="Teller logged in successfully") {
                login({ 
                    email: loginCredentials.email, 
                    role: "Teller" 
                });
                
            } else if(res.data==="Administrator logged in successfully") {
                login({ 
                    email: loginCredentials.email, 
                    role: "Admin" 
                });
            }
        })
        .catch(err=>{
            if(err.response) {
                console.log("Failed to log in: " + err.response.data);
                setLogInErrorMessage(err.response.data);
            }
        })
    }

    return(<div className="login-page">
    <div className="container">
        <div className="row flex-column">
            <div className="login-form-width col mx-auto justify-content-center align-items-center rounded-5 bg-light login-form-wrapper pt-4 pb-4">
                <form onSubmit={e=>handleLogIn(e)} className="px-4 pt-1">
                    <div className="mb-2">
                        <input placeholder="Email" type="text" className="form-control" id="email" name="email"/>
                    </div>
                    <div className="mb-3">
                        <input placeholder="Password" type="password" className="form-control" id="password" name="password"/>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-dark">Log In</button>
                    </div>
                </form>
            </div>
            { logInErrorMessage!=="" && <div className="login-form-width text-center bg-danger rounded-2 mx-auto text-white my-2" style={{opacity: 0.6}}>{logInErrorMessage}</div>}
            <span onClick={()=>setIsNewUserMode(true)} className="sign-up-prompt text-center text-muted fst-italic mt-1">No Account Yet, Sign Up?</span>
            <NewUserModal isNewUserMode={isNewUserMode} setIsNewUserMode={setIsNewUserMode} API_ENDPOINT={API_ENDPOINT}/>
        </div>
    </div>
</div>)
}

export default LoginPage;