import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import { AlignRightOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/footer";
import { Avatar, Card, Button, Popconfirm, Skeleton, Spin } from "antd";
import { clearUserData, fetchUserData } from "../reducers/userSlice";
import NavBar from "../components/navbar";


const Account = () => {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = () => {
        dispatch(fetchUserData())
        .then(() => {
            if (user.loggedIn === false) {
                navigate('/login')
            }
        })
    }
     
    useEffect(() => {
        window.scroll(0, 0); 
        getUser();
    }, [])

    const changePreference = async (newPreference) => {
        const data = JSON.stringify({preference: newPreference})
        await fetch('https://api.sportsaibet.com/auth/preference/change', {
                method: "POST",
                credentials: "include", 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                },
                body: data 
                
            });
        getUser()
        window.location.reload();
    }

    const logout = async () => {
            await fetch('https://api.sportsaibet.com/auth/logout', {
                method: "GET",
                credentials: "include", 
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            });
            dispatch(() => clearUserData());
            navigate('/login');
            window.location.reload();
    }

    
    const [menu, setMenu] = useState(false);
    const openMenu = () => {
        if (menu === false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }


    return (
        <div className="accountPage">
            <NavBar/>
            {user.loading && <div className="accountContentLoad">
                <Spin spinning={true} fullscreen/>
            </div>}
            {!user.loading && <div className="accountContent">
                {user.loading ? <Skeleton.Input active={true} size='large' />:<h1>Hello, {user.firstName}</h1>}
                <div className="loginCard">
                        <Card title='Email' bordered={false}>
                            <p>Your current email: {user.loading ? <Skeleton.Input size='small' active={true}/> : user.email}</p>
                        </Card>
                </div>
                <div className="loginCard">
                        <Card title='Preferences' bordered={false}>
                            <div className="loginCardSpace">
                                <p>Daily Emails: {user.loading ? <Skeleton.Avatar shape="round" size='small'/>:user.dailyEmail ? 'On':'Off'}</p>          
                                {user.dailyEmail ? <Button onClick={() => changePreference(false)}>Turn Off</Button> : <Button onClick={() => changePreference(true)}>Turn On</Button>}
                            </div>
                        </Card>
                </div>
                <div className="logoutButton">
                    <Popconfirm
                        title='Logout'
                        description='Are you sure you want to logout'
                        okText='Yes'
                        cancelText='No'
                        onConfirm={() => logout()}
                    >
                        <Button type='primary' danger>Logout</Button>
                    </Popconfirm>
                </div>
            </div>}
            <Footer/>
        </div>
    )
}

export default Account;