import { NavLink, Link, useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { AlignRightOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import Footer from "../components/footer";
import arrow from '../images/arrow.png';
import { notification, Button, Avatar } from "antd";
import NavBar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNFLGames } from "../reducers/nflSlice";



const Homepage = () => {

    const dispatch = useDispatch();
    const mlb = useSelector(state => state.mlb.games);
    const nfl = useSelector(state => state.nfl.games);
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0);
        // dispatch(fetchNFLGames());
    }, [])

    useEffect(() => {
        
    })

    const getPick = () => {
        navigate('/getpicks');
    }

    return (
        <div className="homepage">
            <header>
                <NavBar/>
                <div className="mainHeader">
                    <div>
                        <Carousel autoplay>
                            <div className="carousel">
                            <h1>10+ Books Avalible</h1>
                            </div>
                            <div className="carousel">
                                <h1>Current Betting Lines</h1>
                            </div>
                            <div className="carousel">
                                <h1>FREE Predictions</h1>
                            </div>
                        </Carousel>
                        {/* <h1>Picks</h1>
                        {nfl.length > 0 && <div className="gameCardHomepage" onClick={() => getPick()}>
                            <div>
                                <h3>{nfl[0].teamTwo}</h3>
                                <h3>{nfl[0].teamOne}</h3>
                            </div>
                            <div className="gameCardOdds">
                                <h4>O/U: {nfl[0].odds.overUnder}</h4>
                                <h4>{nfl[0].odds.favored}</h4>
                            </div>
                            <div>
                                <h4>{nfl[0].date}</h4>
                                <h4>{nfl[0].time}</h4>
                            </div>
                        </div>} */}
                    </div>
                    <div className="getTopPicks">
                        <h2><Link to='/getpicks'>Get Picks Now</Link></h2>
                    </div>
                </div>
            </header>
            <div className="mainInfo">
                <div className="mainInfoItem">
                    <h1>ALL 4</h1>
                    <h2>Major Sports</h2>
                </div>
                <div className="mainInfoItem">
                    <h1>EVERY</h1>
                    <h2>Game</h2>
                </div>
                <div className="mainInfoItem">
                    <h1>10+</h1>
                    <h2>Sports Books</h2>
                </div>
                <div className="mainInfoItem">
                    <h1>FREE</h1>
                    <h2>Predictions</h2>
                </div>
            </div>
            <div className='homepageHowItWorks'>
                <div className="homepageWork">
                    <h1>Data</h1>
                    <h4>Past game data is passed through the AI Model</h4>
                </div>
                <div className="homepageWork">
                    <h1>AI Prediction</h1>
                    <h4>The AI Model uses the past data to predict games</h4>
                </div>
                <div className="homepageWork">
                    <h1>Betting Lines</h1>
                    <h4>Betting lines from sportsbooks are used to compare to the AI prediction</h4>
                </div>
                <div className="homepageWork">
                    <h1>Result</h1>
                    <h4>Sports AI Bet chooses a team based on both the line and AI Model prediction</h4>
                </div>
                <div className="getPicksHomepage">
                    <h2><Link to='/getpicks'>Get Picks Now</Link></h2>
                    <img src={arrow} alt='getPicks'/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;