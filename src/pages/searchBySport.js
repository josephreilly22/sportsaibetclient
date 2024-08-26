import { Link, NavLink, useNavigate } from "react-router-dom";
import { AlignRightOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import logo from '../images/logo.png';
import xButton from '../images/x-button.png';
import { Radio, Avatar, Steps } from "antd";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMLBGames } from '../reducers/mlbSlice.js';
import { fetchNFLGames } from "../reducers/nflSlice.js";
import { Skeleton, message } from 'antd';
import NavBar from "../components/navbar.js";
import mlblogo from '../images/mlblogo.png';
import nfllogo from '../images/nfllogo.png';
import { Tabs, Tab, Button } from '@nextui-org/react';


const SearchBySport = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.scroll(0, 0);
        dispatch(fetchMLBGames());
        // dispatch(fetchNFLGames());
    }, [])

    const navigate = useNavigate();

    const mlb = useSelector((state) => state.mlb);

    const nfl = useSelector((state) => state.nfl);
    
    const mlbloading = useSelector((state) => state.mlb.loading);

    const nflloading = useSelector((state) => state.nfl.loading);

    const handlePickMLBGame = (e, id) => {
        e.preventDefault();
        navigate(`/mlb/${id}`)
    }

    const handlePickNFLGame = (e, id) => {
        e.preventDefault();
        navigate(`/nfl/${id}`)
    }

    const [sport, setSport] = useState('mlb');

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info("NFL Game Predictions are not avalible yet");
    }

    useEffect(() => {
        if (sport === 'nfl') {
            info();
        }
    }, [sport])

    const getInning = (teamOneLineScore, teamTwoLineScore) => {
        let inning = teamTwoLineScore.length;
        let topBot;
        if (teamOneLineScore.length === teamTwoLineScore.length) {
            topBot = 'Bot'
        } else {
            topBot = 'Top'
        }
        return `${topBot} ${inning}`
    }

    return (
        <div className="topPicks">
            {contextHolder}
            <NavBar/>
            <div className="searchHeader">
                <h1>Today's Picks</h1>
                <div className="selectForSport">
                    {/* <Radio.Group defaultValue="mlb" buttonStyle="solid">
                        <Radio.Button value="mlb" onClick={() => setSport('mlb')}>MLB</Radio.Button>
                        <Radio.Button value="nfl" onClick={() => setSport('nfl')}>NFL</Radio.Button>
                        <Radio.Button value="nba" onClick={() => setSport('nba')} disabled>NBA</Radio.Button>
                        <Radio.Button value="nhl" onClick={() => setSport('nhl')} disabled>NHL</Radio.Button>
                    </Radio.Group> */}
                    <Tabs variant="solid" aria-label="Tabs variants" disabledKeys={['nba', 'nhl', 'nfl']} onSelectionChange={setSport}>
                        <Tab key="mlb" title='MLB' />
                        <Tab key="nfl" title='NFL' />
                        <Tab key="nba" title='NBA' />
                        <Tab key="nhl" title='NHL' />
                    </Tabs>
                </div>
                <div className="selctedSport">
                    {sport === 'mlb' && <div className="getPickSportMLB">
                        <img className="leaguelogo" alt="mlb" src={mlblogo} />
                        <h4>Major League Baseball</h4>
                    </div>}
                    {sport === 'nfl' && <div className="getPickSport">
                        <img className="leaguelogo" alt="mlb" src={nfllogo} />
                        <h4>National Football League</h4>
                        <h4>Week {nfl.games[0].week}</h4>
                    </div>}
                </div>
            </div>
                {!mlbloading && mlb.games.length === 0 && sport === 'mlb' && <div className="gettingMLBData">
                    <Steps 
                        current={1}
                        items={[
                            {
                                title: 'Stats',
                                description: 'Getting daily MLB statistics, probables and odds'
                            },
                            {
                                title: 'AI Prediction',
                                description: 'Getting predictions'
                            },
                            {
                                title: 'Picks LIVE',
                                description: 'Picks Avalible!'
                            }
                        ]}
                    />
                </div>}
                {sport === 'mlb' && mlbloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'mlb' && mlbloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'mlb' && mlbloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'mlb' && mlbloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'mlb' && mlbloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                <div className="topPickGames">
                {!mlbloading && sport === 'mlb' && mlb.games.map(game => {
                    const date = game.dateOfGame.split("-");
                    return (
                        <div className="gameCard" onClick={(e) => handlePickMLBGame(e, game._id)}>
                            <div>
                                <h2 className={game.teamOneWinner === 1 ? "loser" : ""}>{game.teamTwo}</h2>
                                <h2 className={game.teamOneWinner === 0 ? "loser" : ""}>{game.teamOne}</h2>
                            </div>
                            <div className="gameCardScore">
                                {(game.teamTwoLineScore !== null) && <h2 className={game.teamOneWinner === 1 ? "loser" : ""}>{game.teamTwoScore}</h2>}
                                {(game.teamTwoLineScore !== null) && <h2 className={game.teamOneWinner === 0 ? "loser" : ""}>{game.teamOneScore}</h2>}
                                {(game.teamTwoLineScore === null) && <h2 className='searchOdds'>{game.bestMLBook[0].name==game.teamTwo?game.bestMLBook[0].price:game.bestUnpredictedBook[0].price}</h2>}
                                {(game.teamTwoLineScore === null) && <h2 className='searchOdds'>{game.bestMLBook[0].name==game.teamOne?game.bestMLBook[0].price:game.bestUnpredictedBook[0].price}</h2>}
                            </div>
                            {game.teamTwoLineScore === null && <div>
                                <h3>{date[1]}/{date[2]}</h3>
                                <h3>{game.time}</h3>
                            </div>}
                            {(game.teamOneWinner === 1 || game.teamOneWinner === 0) && <div>
                                <h3>Final</h3>
                            </div>}
                            {((game.teamOneWinner !== 1 && game.teamOneWinner !== 0) && (game.teamTwoLineScore !== null)) && <div>
                                <h3 id="live">LIVE</h3>
                                <h3>{getInning(game.teamOneLineScore, game.teamTwoLineScore)}</h3>
                            </div>}
                        </div>
                    )
                })}
                {sport === 'nfl' && nflloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'nfl' && nflloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'nfl' && nflloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'nfl' && nflloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {sport === 'nfl' && nflloading && <div id='skeleton'><Skeleton active id='skelton'/></div>}
                {!nflloading && sport === 'nfl' && nfl.games.map(game => {
                    return (
                        <div className="gameCard" onClick={(e) => handlePickNFLGame(e, game._id)}>
                            <div>
                                <h2>{game.teamTwo}</h2>
                                <h2>{game.teamOne}</h2>
                            </div>
                            <div className="gameCardOdds">
                                <h3>O/U: {game.odds.overUnder}</h3>
                                <h3>{game.odds.favored}</h3>
                            </div>
                            <div>
                            </div>
                            <div>
                                <h3>{game.date}</h3>
                                <h3>{game.time}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default SearchBySport;