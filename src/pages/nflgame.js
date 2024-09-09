import { AlignRightOutlined, DeploymentUnitOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import Footer from "../components/footer";
import { NavLink, Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, message, Avatar, Steps } from 'antd';
import NavBar from '../components/navbar';
import { Tab, Tabs } from '@nextui-org/react';


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

    const [pickOrOdds, setPickOrOdds] = useState('pick');

    const [oddsPick, setOddPick] = useState('ml');

    const [pick, setPick] = useState();

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

    const getGameStatus = () => {
        let status;
        if (gameData.teamOneWinner === 1 || gameData.teamOneWinner === 0 ){
            status = 3;
        } else if (gameData.teamTwoLineScore !== null) {
            status = 1;
        } else {
            status = 0;
        }
        return status;
    }


    return (
        <div className="gamePage">
            <NavBar/>
            <div className='singleGameSection'>
            {contextHolder}
                <div className='singleGameTeamHeader'>
                    <div className={gameData.teamOneWinner == 0 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamTwo}</h1>
                        {gameData.teamTwoLineScore !== null && <h2>{gameData.teamTwoScore}</h2>}
                        {/* <h4>{gameData.teamTwoWins}-{gameData.teamTwoLosses}</h4> */}
                    </div>
                    {(gameData.teamOneWinner == 1 || gameData.teamOneWinner == 0) && <h4>Final</h4>}
                    {gameData.teamOneWinner == null && gameData.teamTwoLineScore !== null && <div> 
                        <h4>LIVE</h4>
                        {/* <h4>Qtr {gameData.teamTwoLineScore.length}</h4> */}
                    </div>}
                    {gameData.teamTwoLineScore === null && <div>
                        {gameData.teamTwoLineScore === null && <h5>{gameData.date}</h5>}
                        {gameData.teamTwoLineScore === null && <h5>{gameData.time}</h5>}
                    </div>}
                    <div className={gameData.teamOneWinner == 1 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamOne}</h1>
                        {gameData.teamTwoLineScore !== null && <h2>{gameData.teamOneScore}</h2>}
                        {/* <h4>{gameData.teamOneWins}-{gameData.teamOneLosses}</h4> */}
                    </div>
                </div>
                {gameData.teamOneLineScore != null && <div className='nfllinesscore'>
                    <h3></h3>
                    <h3>1</h3>
                    <h3>2</h3>
                    <h3>3</h3>
                    <h3>4</h3>
                    <h3>Total</h3>
                    
                    <h3>{gameData.teamTwo}</h3>
                    {gameData.teamTwoLineScore.length >= 1 ? <h4>{gameData.teamTwoLineScore[0].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 2 ? <h4>{gameData.teamTwoLineScore[1].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 3 ? <h4>{gameData.teamTwoLineScore[2].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 4 ? <h4>{gameData.teamTwoLineScore[3].value}</h4>:<h4>-</h4>}
                    <h2 className={gameData.teamOneWinner === 1 ? 'loser': ''}>{gameData.teamTwoScore}</h2>

                    <h3>{gameData.teamOne}</h3>
                    {gameData.teamOneLineScore.length >= 1 ? <h4>{gameData.teamOneLineScore[0].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 2 ? <h4>{gameData.teamOneLineScore[1].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 3 ? <h4>{gameData.teamOneLineScore[2].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 4 ? <h4>{gameData.teamOneLineScore[3].value}</h4>:<h4>-</h4>}
                    <h2 className={gameData.teamOneWinner === 0 ? 'loser': ''}>{gameData.teamOneScore}</h2>
                </div>}
                <div className='gameProgress'>
                        <Steps 
                            current={getGameStatus()}
                            items={[
                                {
                                    title: 'Pre-Game',
                                    description: 'Predictions Coming soon'
                                },
                                {
                                    title: 'Game LIVE',
                                    description: 'Game is currently live'
                                },
                                {
                                    title: 'Game Ended',
                                    description: 'Game has completed'
                                }
                            ]}
                        />
                </div>
                {gameData.teamTwoLineScore === null && <div className='pickOrOdds'>
                    <Tabs variant='underlined' onSelectionChange={setPickOrOdds}>
                        {/* <Tab key='pick' title='Pick' />
                        <Tab key='odds' title='Odds' /> */}
                        <Tab key='gameInfo' title='Game Info' />
                    </Tabs>
                </div>}
                {pickOrOdds === 'pick' && gameData.teamOneWinner == null && gameData.teamOneLineScore === null && <div className='generatePick'>
                    <Button type="primary" loading={buttonLoad} icon={<DeploymentUnitOutlined/>}>Get FREE Prediction</Button>
                </div>}
                {pickOrOdds === 'pick' && showPick && 
                <div className='showingPick'>
                    <div>
                        <h5>Based on {gameData.odds.favored}</h5>
                        <h5>Sports AI Bet Says to bet on</h5>
                        <h2>{pick}</h2>
                    </div>
                    <div className='showPickOverUnder'>
                        <h5>Based on O/U: {gameData.odds.overUnder}</h5>
                        <h5>Sports AI Bet Says to bet on the</h5>
                        <h2>{gameData.overUnderPick}</h2>
                    </div>
                </div>}
                {pickOrOdds === 'odds' && gameData.teamOneWinner == null && gameData.teamOneLineScore === null && <div className='gameOdds'>
                    <h4>Odds by the Book</h4>
                    <div className='oddsType'>
                        <Tabs variant='underlined' color='success' onSelectionChange={setOddPick}>
                            <Tab key='ml' title='Money Line' />
                            <Tab key='spread' title='Spread' />
                            <Tab key='ou' title='Over/Under' />
                        </Tabs>
                    </div>
                    
                    <div className='oddsContent'>
                        {oddsPick === 'ml' && <div className='oddsPerBook'>
                            <h4>Book</h4>
                            <h5>{gameData.teamOne}</h5>
                            <h5>{gameData.teamTwo}</h5>
                        </div>}
                        {oddsPick === 'spread' && <div className='oddsPerBook'>
                            <h4>Book</h4>
                            <h5>{gameData.teamOne}</h5>
                            <h5>{gameData.teamTwo}</h5>
                        </div>}
                        {oddsPick === 'ou' && <div className='oddsPerBook'>
                            <h4>Book</h4>
                            <h4>Over</h4>
                            <h4>Under</h4>
                        </div>}
                        <h3>Sports odds coming next week</h3>
                        {/* {books.map(bookData => {
                            return (
                                <>
                                    {oddsPick === 'ml' && <div className={gameData.bestMLBook.bookName == bookData.bookName?'oddsPerBook bestBook':'oddsPerBook'}>
                                        <h4>{bookData.bookName}</h4>
                                        <h5 className='oddNumbers'>{bookData.markets[0].outcomes[0].name == gameData.teamOne ? bookData.markets[0].outcomes[0].price : bookData.markets[0].outcomes[1].price}</h5>
                                        <h5 className='oddNumbers'>{bookData.markets[0].outcomes[0].name == gameData.teamTwo ? bookData.markets[0].outcomes[0].price : bookData.markets[0].outcomes[1].price}</h5>
                                    </div>}
                                    {oddsPick === 'spread' && <div className='oddsPerBook'>
                                        <h4>{bookData.bookName}</h4>
                                        <div className='oddNumbers'>
                                            <h5>{bookData.markets[1].outcomes[0].name == gameData.teamOne ? bookData.markets[1].outcomes[0].price : bookData.markets[1].outcomes[1].price}</h5>
                                            <h5>{bookData.markets[1].outcomes[0].name == gameData.teamOne ? bookData.markets[1].outcomes[0].point : bookData.markets[1].outcomes[1].point}</h5>
                                        </div>
                                        <div className='oddNumbers'>
                                            <h5>{bookData.markets[1].outcomes[0].name == gameData.teamTwo ? bookData.markets[1].outcomes[0].price : bookData.markets[1].outcomes[1].price}</h5>
                                            <h5>{bookData.markets[1].outcomes[0].name == gameData.teamTwo ? bookData.markets[1].outcomes[0].point : bookData.markets[1].outcomes[1].point}</h5>
                                        </div>
                                    </div>}
                                    {oddsPick === 'ou' && <div className='oddsPerBook'>
                                        <h4>{bookData.bookName}</h4>
                                        <div className='oddNumbers'>
                                            <h5>{bookData.markets[2].outcomes[0].name == 'over' ? bookData.markets[2].outcomes[0].price : bookData.markets[2].outcomes[1].price}</h5>
                                            <h5>{bookData.markets[2].outcomes[0].name == 'over' ? bookData.markets[2].outcomes[0].point : bookData.markets[2].outcomes[1].point}</h5>
                                        </div>
                                        <div className='oddNumbers'>
                                            <h5>{bookData.markets[2].outcomes[0].name == 'under' ? bookData.markets[2].outcomes[1].price : bookData.markets[2].outcomes[0].price}</h5>
                                            <h5>{bookData.markets[2].outcomes[0].name == 'under' ? bookData.markets[2].outcomes[1].point : bookData.markets[2].outcomes[0].point}</h5>
                                        </div>
                                    </div>}
                                </>
                            )
                        })} */}
                    </div>
                </div>}
                {(pickOrOdds === 'gameInfo' || gameData.teamTwoLineScore !== null) && <div className='gameInfo'>
                    <h4>Game Info</h4>
                    <h5>{`Stadium: ${gameData.stadium}`}</h5>
                    <h5>{`Date: ${gameData.date}`}</h5>
                    <h5>{`Time: ${gameData.time}`}</h5>
                </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default NFLGame;