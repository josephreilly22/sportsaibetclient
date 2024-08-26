import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import { AlignRightOutlined, GoogleOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import Footer from "../components/footer";
import { Button, Card, Avatar } from "antd";
import NavBar from "../components/navbar";

const Login = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0);
        if (user.loggedIn === true) {
            navigate('/account')
        }
    }, [])

    const connectToLogin = () => {
        window.location = 'https://api.sportsaibet.com/auth/google'
    }

    return (
        <div className="loginPage">
            <NavBar/>
            <div className="loginContent">
                <h1>Login/Create Account</h1>
                <Button onClick={() => connectToLogin()} icon={<GoogleOutlined/>} className="googleLoginButton">Continue with Google</Button>
                <h2>Features</h2>
                <div className="loginCards">
                    <div className="loginCard">
                        <Card title='Stay Up to Date' bordered={false}>
                            <p>Get picks everyday right when they are made</p>
                        </Card>
                    </div>
                    <div className="loginCard">
                        <Card title='Get what you want' bordered={false}>
                            <p>Get only the picks you care about</p>
                        </Card>
                    </div>
                    <div className="loginCard">
                        <Card title='Turn off notifications easily' bordered={false}>
                            <p>Easily turn off email notifications in account settings</p>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;