import { DeploymentUnitOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, message, Steps } from 'antd';
import Navbar from '../components/navbar';
import { Tab, Tabs } from '@nextui-org/react';

const MLBGame = () => {

    const mlb = useSelector((state) => state.mlb);
    const nfl = useSelector((state) => state.nfl);

    const { id } = useParams();

    const navigate = useNavigate();

    const [showPick, setShowPick] = useState(false);

    const [gameData, setGameData] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        mlb.games.map(game => {
            if (game._id == id) {
                setGameData(game);
                setBooks(game.sportsOdds);
                if (game.teamTwoLineScore !== null) {
                    info();
                }
            }
        })
        nfl.games.map(game => {
            if (game._id == id) {
                setGameData(game);
            }
        })
        if (mlb.games.length == 0) {
            navigate('/getpicks');
        }
    }, [])

    const [buttonLoad, setButtonLoad] = useState(false);

    const [pick, setPick] = useState();

    const calculateOdds = () => {
        setButtonLoad(true);
        setShowPick(false);
        messageApi.info("Getting Free Prediction");
        if (gameData.teamOnePercentage >= 0.5) {
            setPick(gameData.teamOne);
        } else {
            setPick(gameData.teamTwo);
        }
        setTimeout(() => {
            setButtonLoad(false);
            setShowPick(true);
        }, 2000);
    }

    const handlePickGame = (e, id) => {
        e.preventDefault();
        navigate(`/mlb/${id}`)
    }

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info("This game is in progress or has been completed");
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

    const [pickOrOdds, setPickOrOdds] = useState('pick');

    const [oddsPick, setOddPick] = useState('ml');

    const onOddsPick = (type) => {
        setOddPick(type);
    }

    const getInning = (teamOneLineScore, teamTwoLineScore) => {
        let inning = teamTwoLineScore.length;
        let topBot;
        if (teamOneLineScore == teamTwoLineScore) {
            topBot = 'Bot'
        } else {
            topBot = 'Top'
        }
        return `${topBot} ${inning}`
    }


    return (
        <div className="gamePage">
            <Navbar/>
            <div className='singleGameSection'>
            {contextHolder}
                <div className='singleGameTeamHeader'>
                    <div className={gameData.teamOneWinner == 0 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamTwo}</h1>
                        {gameData.teamTwoLineScore !== null && <h2>{gameData.teamTwoScore}</h2>}
                        <h4>{gameData.teamTwoWins}-{gameData.teamTwoLosses}</h4>
                    </div>
                    {(gameData.teamOneWinner == 1 || gameData.teamOneWinner == 0) && <h4>Final</h4>}
                    {gameData.teamOneWinner == null && gameData.teamTwoLineScore !== null && <div> 
                        <h4>LIVE</h4>
                        <h4>{()=>getInning()}</h4>
                    </div>}
                    {gameData.teamTwoLineScore === null && <h4>{gameData.time}</h4>}
                    <div className={gameData.teamOneWinner == 1 ? 'teamNameAndScore winner' : 'teamNameAndScore'}>
                        <h1>{gameData.teamOne}</h1>
                        {gameData.teamTwoLineScore !== null && <h2>{gameData.teamOneScore}</h2>}
                        <h4>{gameData.teamOneWins}-{gameData.teamOneLosses}</h4>
                    </div>
                </div>
                {gameData.teamOneLineScore != null && <div className='lineScore'>
                    <h3></h3>
                    <h3>1</h3>
                    <h3>2</h3>
                    <h3>3</h3>
                    <h3>4</h3>
                    <h3>5</h3>
                    <h3>6</h3>
                    <h3>7</h3>
                    <h3>8</h3>
                    <h3>9</h3>
                    <h3>Total</h3>
                    
                    <h3>{gameData.teamTwo}</h3>
                    {gameData.teamTwoLineScore.length >= 1 ? <h4>{gameData.teamTwoLineScore[0].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 2 ? <h4>{gameData.teamTwoLineScore[1].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 3 ? <h4>{gameData.teamTwoLineScore[2].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 4 ? <h4>{gameData.teamTwoLineScore[3].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 5 ? <h4>{gameData.teamTwoLineScore[4].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 6 ? <h4>{gameData.teamTwoLineScore[5].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 7 ? <h4>{gameData.teamTwoLineScore[6].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 8 ? <h4>{gameData.teamTwoLineScore[7].value}</h4>:<h4>-</h4>}
                    {gameData.teamTwoLineScore.length >= 9 ? <h4>{gameData.teamTwoLineScore[8].value}</h4>:<h4>-</h4>}
                    <h2 className={gameData.teamOneWinner === 1 ? 'loser': ''}>{gameData.teamTwoScore}</h2>

                    <h3>{gameData.teamOne}</h3>
                    {gameData.teamOneLineScore.length >= 1 ? <h4>{gameData.teamOneLineScore[0].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 2 ? <h4>{gameData.teamOneLineScore[1].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 3 ? <h4>{gameData.teamOneLineScore[2].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 4 ? <h4>{gameData.teamOneLineScore[3].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 5 ? <h4>{gameData.teamOneLineScore[4].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 6 ? <h4>{gameData.teamOneLineScore[5].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 7 ? <h4>{gameData.teamOneLineScore[6].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 8 ? <h4>{gameData.teamOneLineScore[7].value}</h4>:<h4>-</h4>}
                    {gameData.teamOneLineScore.length >= 9 ? <h4>{gameData.teamOneLineScore[8].value}</h4>:<h4>-</h4>}
                    <h2 className={gameData.teamOneWinner === 0 ? 'loser': ''}>{gameData.teamOneScore}</h2>
                </div>}
                <div className='gameProgress'>
                        <Steps 
                            current={getGameStatus()}
                            items={[
                                {
                                    title: 'Pre-Game',
                                    description: 'Predictions Avalible'
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
                        <Tab key='pick' title='Pick' />
                        <Tab key='odds' title='Odds' />
                        <Tab key='gameInfo' title='Game Info' />
                    </Tabs>
                </div>}
                {pickOrOdds === 'pick' && gameData.teamOneWinner == null && gameData.teamOneLineScore === null && <div className='generatePick'>
                    <Button type="primary" loading={buttonLoad} icon={<DeploymentUnitOutlined/>} onClick={() => calculateOdds()}>Get FREE Prediction</Button>
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
                        {books.map(bookData => {
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
                        })}
                    </div>
                </div>}
                {(pickOrOdds === 'gameInfo' || gameData.teamTwoLineScore !== null) && <div className='gameInfo'>
                    <h4>Game Info</h4>
                    <h5>{`Stadium: ${gameData.stadium}`}</h5>
                    <h5>{`Date: ${gameData.dateOfGame}`}</h5>
                    <h5>{`Time: ${gameData.time}`}</h5>
                </div>}
            </div>
            <Footer/>
        </div>
    )
}

export default MLBGame;