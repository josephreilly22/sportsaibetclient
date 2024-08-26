import { Result } from "antd";
import { NavLink, Link } from "react-router-dom";
import { AlignRightOutlined } from '@ant-design/icons';
import { useState } from "react";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import Footer from "../components/footer";


const PageNotFound = () => {


    const [menu, setMenu] = useState(false)
    const openMenu = () => {
        if (menu === false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }


    return (
        <div className="pageNotFound">
            <nav className={menu ? "navOpen":"navClosed"}>
                <div className={menu ? "navLogoA navLogoOpen":"navLogoA navLogo"}><Link id='navLogo' to='/'>Sports AI Bet<img alt='logo' src={logo}/></Link></div>
                    <ul>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/'>Home</NavLink></li>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/toppicks'>Top Picks</NavLink></li>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/getpicks'>Get Picks</NavLink></li>
                    </ul>
                    <li className='toggle' onClick={openMenu}>{menu ? <img alt='closeMenu' src={xButton}/> :<AlignRightOutlined/>}</li>
                </nav>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to='/'>Go Home</Link>}
            />
            <Footer/>
    </div>
    )
}

export default PageNotFound;