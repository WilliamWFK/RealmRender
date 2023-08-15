//NAVIGATION INDEX
import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/loadMap" activeStyle>
                        LoadMap
                    </NavLink>
                    <NavLink to="/index" activeStyle>
                        Home
                    </NavLink>
                </NavMenu>
            </Nav> 
        </>     
    );
};
 
export default Navbar;