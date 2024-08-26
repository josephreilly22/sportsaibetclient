import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import { Button } from "antd";


const Contact = () => {

    useEffect(() => {
        window.scroll(0, 0);
    })

    return (
        <div className="contactPage">
            <NavBar/>
            <div className="howToContact">
                <h1>Contact Us</h1>
                <h2>Email: <a href="mailto:picks@sportsaibet.com">picks@sportsaibet.com</a></h2>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact;