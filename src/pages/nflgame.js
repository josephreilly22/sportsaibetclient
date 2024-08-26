import { AlignRightOutlined, DeploymentUnitOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import Footer from "../components/footer";
import { NavLink, Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, message, Avatar } from 'antd';


const NFLGame = () => {

    const mlb = useSelector((state) => state.mlb);
    const nfl = useSelector((state) => state.nfl);

    const { id } = useParams();

    const navigate = useNavigate();

    const [showPick, setShowPick] = useState(false);

    const [menu, setMenu] = useState(false);
    const openMenu = () => {
        if (menu === false) {
            setMenu(true);
        } else {
            setMenu(false);
        }
    }

    const [gameData, setGameData] = useState({});

    useEffect(() => {
        window.scroll(0, 0);
        nfl.games.map(game => {
            if (game._id === id) {
                setGameData(game);
            }
        })
        if (nfl.games.length === 0) {
            navigate('/getpicks');
        }
        info();
    }, [])

    const [buttonLoad, setButtonLoad] = useState(false);

    const handlePickGame = (e, id) => {
        e.preventDefault();
        navigate(`/nfl/${id}`)
    }

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info("Prediction not avalible yet");
    }


    return (
        <div className="gamePage">
            <nav className={menu ? "navOpen":"navClosed"}>
                <div className={menu ? "navLogoA navLogoOpen":"navLogoA navLogo"}><Link id='navLogo' to='/'>Sports AI Bet<img alt='logo' src={logo}/></Link></div>
                    <ul>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/'>Home</NavLink></li>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/getpicks'>Get Picks</NavLink></li>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/results'>Past Results</NavLink></li>
                        <li className={menu ? "menuOpen":"menuClosed"} onClick={() => openMenu()}><NavLink to='/account'><Avatar icon={<UserOutlined/>}/></NavLink></li>
                    </ul>
                    <li className='toggle' onClick={openMenu}>{menu ? <img alt='closeMenu' src={xButton}/> :<AlignRightOutlined/>}</li>
            </nav>
            {contextHolder}
            <div className='singleGameSection'>
                <div className='singleGameTeamHeader'>
                    <div className={gameData.teamOneWinner == 0 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamTwo}</h1>
                        {gameData.teamOneWinner < 2 && <h2>{gameData.teamTwoScore}</h2>}
                        <h4>{gameData.teamOneWins}-{gameData.teamOneLosses}</h4>
                    </div>
                    {gameData.teamOneWinner == 1 || gameData.teamOneWinner == 0 && <h4>Final</h4>}
                    {gameData.teamOneWinner == null && (gameData.teamOneScore > 0 || gameData.teamTwoScore > 0) && <h4>In Progress</h4>}
                    {gameData.teamOneWinner == null && (gameData.teamOneScore == 0 || gameData.teamOneScore == null) && (gameData.teamTwoScore == 0 || gameData.teamTwoScore == null) && <h4>{gameData.time}</h4>}
                    <div className={gameData.teamOneWinner == 1 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamOne}</h1>
                        {gameData.teamOneWinner < 2 && <h2>{gameData.teamOneScore}</h2>}
                        <h4>{gameData.teamTwoWins}-{gameData.teamTwoLosses}</h4>
                    </div>
                </div>
                <div className='gameInfo'>
                    <h4>Game Info</h4>
                    <h5>{`Stadium: ${gameData.stadium}`}</h5>
                    <h5>{`Date: ${gameData.date}`}</h5>
                    <h5>{`Time: ${gameData.time}`}</h5>
                </div>
                <div className='gameOdds'>
                    <h4>Odds</h4>
                    {gameData.odds && <h1>{gameData.odds.favored}</h1>}
                    {gameData.odds && <h1>O/U: {gameData.odds.overUnder}</h1>}
                </div>
                { (gameData.teamOneScore >= 1 || gameData.teamTwoScore >= 1) && <div className='pickAnotherGame'>
                    <h4>Other NFL Games:</h4>
                    
                    {mlb.games.map(game => {
                        if (game.teamOneWinner == null) {
                            const date = game.dateOfGame.split("-");
                            return (
                                <div className="gameCard" onClick={(e) => handlePickGame(e, game._id)}>
                                    <div>
                                        <h2 className={game.teamOneWinner === 0 ? "winner" : ""}>{game.teamTwo}</h2>
                                        <h2 className={game.teamOneWinner === 1 ? "winner" : ""}>{game.teamOne}</h2>
                                    </div>
                                    <div className="gameCardScore">
                                        {game.teamTwoScore != null && <h2 className={game.teamOneWinner === 0 ? "winner" : ""}>{game.teamTwoScore}</h2>}
                                        {game.teamTwoScore != null && <h2 className={game.teamOneWinner === 1 ? "winner" : ""}>{game.teamOneScore}</h2>}
                                    </div>
                                    <div className="gameCardOdds">
                                        <h3>O/U: {game.odds.overUnder}</h3>
                                        <h3>{game.odds.favored}</h3>
                                    </div>
                                    <div>
                                        <h3>{date[1]}/{date[2]}</h3>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>}
                {gameData.teamOneWinner == null && gameData.teamOneScore < 1 && gameData.teamTwoScore < 1 && <div className='generatePick'>
                    <Button type="primary" loading={buttonLoad} icon={<DeploymentUnitOutlined/>}>Get FREE Prediction</Button>
                </div>}
                {showPick && 
                <div className='showingPick'>
                    <h5>Based on {gameData.odds.favored}</h5>
                    <h5>Sports AI Bet Says to bet on</h5>
                    <h2>Pick</h2>
                </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default NFLGame;