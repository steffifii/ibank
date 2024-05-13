import React, { useRef, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import './../App.scss';

import { AuthContext } from "../assets/contexts/AuthContext";

const NavBar = () => {

    const { authUser, logout } = useContext(AuthContext);

    const tooltipRef = useRef(null);

    const [ isMobNavOpen, setIsMobNavOpen ] = useState(false);

    const logoNav = () => {
        return <NavLink className={`logo nav-item d-flex ${ isMobNavOpen ? `hide-item` : `show-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
            <span className="org-name ms-2">iBank</span>
            <i className="fas fa-university my-auto me-1" aria-hidden="true"></i>
        </NavLink>
    }

    const homeNav = () => {
        return <NavLink className={`nav-item pe-sm-4 ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)} active="true">
            <i className="fas fa-home"></i>
        </NavLink>
    }

    const booksNav = () => {
        return <NavLink className={`nav-item pe-sm-4 ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/transactions" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Books</NavLink>
    }

    const transactionsNav = () => {
        return <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/transactions" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Transactions</NavLink>
    }

    const usersNav = () => {
        return <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/users" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Users</NavLink>
    }

    const userLogo = () => {
        return <span className="profile-buffer nav-item hide-item des-item text-muted nav-email" data-tooltip-id="logout-tooltip">
        {authUser.email} <i className="fa fa-user" aria-hidden="true"></i>
    </span> 
    }

    const librarianLogo = () => {
        return <span className="profile-buffer nav-item hide-item des-item text-muted nav-email" data-tooltip-id="logout-tooltip">
        {authUser.email} <i className="fa fa-lock" aria-hidden="true"></i>
    </span> 
    }

    const loginNav = () => {
        return <NavLink className={`profile-buffer nav-item`} to="/login" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
                <span className={`${isMobNavOpen ? `show-item` : `hide-item`} mob-maxi-nav-item`}>Log In
                </span>
               <span className="hide-item des-item">
                   <i className="fa fa-sign-in" aria-hidden="true"></i> Login
               </span>
            </NavLink>
    }

    return(<nav className={`liby-nav navbar navbar-expand-sm justify-content-center text-center d-flex ${isMobNavOpen ? `` : `toggle-mob-nav-height`}`} ref={tooltipRef}>
        <ul className="navbar-nav">
            {logoNav()} {homeNav()} 
            {/* {booksNav()} */}
            {authUser ? 
            authUser.role === "teller" ? <>{usersNav()} {userLogo()}</> 
                :<>{usersNav()} {librarianLogo()}</> 
                : loginNav()}
            <Tooltip id="logout-tooltip" openEvents={{ click: true }} closeEvents={{ click: true }} globalCloseEvents={{ clickOutsideAnchor: true }} clickable={true} className="bg-light text-dark border border-2 hover-pointer arrow">
                <div onClick={()=>logout()}>Logout</div>
            </Tooltip>
        </ul>
    </nav>)
}

export default NavBar;