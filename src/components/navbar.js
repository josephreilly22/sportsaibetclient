import { useState } from "react";
import logo from '../images/logo.png';
import { Link, NavLink } from "react-router-dom";
import xButton from '../images/x-button.png';
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import toggle from '../images/toggle.png'


const NavBar = () => {

    const [menu, setMenu] = useState(false);
    const openMenu = () => {
        if (menu === false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }

    return (
        <nav className={menu ? "navOpen":"navClosed"}>
            <div className={menu ? "navLogoA navLogoOpen":"navLogoA navLogo"}><Link id='navLogo' to='/'>Sports AI Bet<img alt='logo' src={logo}/></Link></div>
                <ul>
                    <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/'>Home</NavLink></li>
                    <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/getpicks'>Get Picks</NavLink></li>
                    <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/results'>Past Results</NavLink></li>
                    <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/account'><Avatar icon={<UserOutlined/>}/></NavLink></li>
                </ul>
            <li className='toggle' onClick={openMenu}>{menu ? <img alt='closeMenu' src={xButton}/> :<img className="togglelines" alt="toggle" src={toggle}/>}</li>
        </nav>
    )
}

export default NavBar;