import { ArrowUpOutlined, ArrowDownOutlined, DotChartOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Card, Statistic, Skeleton } from "antd";
import Footer from "../components/footer";
import { useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import NavBar from "../components/navbar";
import { Tabs, Tab } from '@nextui-org/react';

// Canvas JS Chart
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Results = () => {

    // Overall
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [profit, setProfit] = useState(0);
    const [percentage, setPercentage] = useState(0);

    // Yesterday
    const [games, setGames] = useState([]);
    const [loadedYes, setLoadedYes] = useState(false);
    const [payouts, setPayouts] = useState(0);
    const [profitYes, setProfitYes] = useState(0);
    
    const [type, setType] = useState('all');

    const fetchResults = async () => {
        const response = await axios.get('https://api.sportsaibet.com/results');
        setData(response.data.allGameData);
        setProfit(response.data.allGameData[response.data.allGameData.length - 1]['y']);
        setPercentage(response.data.winPercent);
        setGames(response.data.gamesYes);
        setLoaded(true);
    }

    const fetchYesterdayMLBGames = async () => {
        const response = await axios.get('https://api.sportsaibet.com/mlbyesterday');
        setGames(response.data);
    }

    const getPayouts = () => {
        setPayouts(0);
        let newPayout = 0
        let gamesRight = 0;
        games.map(game => {
            if (((game.teamOneWinner == 1 && game.teamOnePercentage >= 0.5) || (game.teamOneWinner == 0 && game.teamOnePercentage <= 0.5))) {
                newPayout = newPayout + game.payout;
                gamesRight++;
            }
        })
        setPayouts(newPayout);
        setProfitYes(newPayout-(100*games.length));
    }

    useEffect(() => {
        window.scroll(0, 0);
        // fetchYesterdayMLBGames();
        getPayouts();
    },[])

    useEffect(() => {
        getPayouts();
    }, [games])


    useEffect(() => {
        window.scroll(0, 0);
        fetchResults();
    },[])

    const [sport, setSport] = useState('mlb');

    const formatter = value => <CountUp end={value}/>

    const options = {
        animationEnabled: true,
        theme: "dark1",
        title:{
            text: "Sports AI Bet"
        },
        axisX:{
            valueFormatString: "",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Profit",
            valueFormatString: "$0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "Profits",
            yValueFormatString: "$##0.00",
            dataPoints: data
        }]
    }
    

    return (
        <div className="resultsPage">
            <NavBar/>
            <div className="resultsMain">
                <h1>Past Results</h1>
                <div className="selectForSport">
                    <Tabs variant="solid" aria-label="Tabs variants" disabledKeys={['nba', 'nhl', 'nfl']} onSelectionChange={setSport}>
                        <Tab key="mlb" title='MLB' />
                        <Tab key="nfl" title='NFL' />
                        <Tab key="nba" title='MBA' />
                        <Tab key="nhl" title='NHL' />
                    </Tabs>
                </div>
                <div className="selectForSport">
                    <Tabs variant="solid" aria-label="Tabs variants" onSelectionChange={setType}>
                        <Tab key="all" title='All Time' />
                        <Tab key="yes" title='Yesterday' />
                    </Tabs>
                </div>
                {type === 'all' && <div className="resultPercent">
                    <Card bordered={false}>
                        {loaded === true && <Statistic 
                            title='Total Profit'
                            value={profit}
                            precision={0}
                            valueStyle={profit>0?{color: '#3f8600'}:{color: '#cf1322'}}
                            prefix='$'
                            formatter={formatter}
                            suffix={profit>0?<ArrowUpOutlined/>:profit==0?'':<ArrowDownOutlined/>}
                        />}
                        {loaded === false && <Skeleton.Input active />}
                    </Card>
                    <Card bordered={false}>
                        {loaded === true && <Statistic 
                            title='Overall Percentage'
                            value={percentage}
                            precision={0}
                            valueStyle={percentage>50?{color: '#3f8600'}:{color: '#cf1322'}}
                            formatter={formatter}
                            suffix='%'
                        />}
                        {loaded === false && <Skeleton.Input active />}
                    </Card>
                </div>}
                {type === 'all' && <div className='resultChart'>
                    {loaded === true && <CanvasJSChart options = {options} 
                    /* onRef={ref => this.chart = ref} */
                    />}
                    {loaded === false && <Skeleton.Node active>
                        <DotChartOutlined
                            style={{
                            fontSize: 40,
                            color: '#bfbfbf',
                            }}
                        />
                        </Skeleton.Node>}
                </div>}



                {sport === 'mlb' && type === 'yes' && games.length === 0 && <div id='skeleton'>No Data for Yesterday</div>}
                {type === 'yes' && <div className="resultPercent">
                    <Card bordered={false}>
                        <Statistic 
                            title='Yesterdays Payout ($100 Bets)'
                            value={payouts}
                            precision={0}
                            valueStyle={payouts>0?{color: '#3f8600'}:{color: '#cf1322'}}
                            prefix='$'
                            formatter={formatter}
                            suffix={payouts>0?<ArrowUpOutlined/>:payouts==0?'':<ArrowDownOutlined/>}
                            />
                    </Card>
                    <Card bordered={false}>
                        <Statistic 
                            title='Yesterdays Profit ($100 Bets)'
                            value={profitYes}
                            precision={0}
                            valueStyle={profitYes>0?{color: '#3f8600'}:{color: '#cf1322'}}
                            prefix='$'
                            formatter={formatter}
                            suffix={profitYes>0?<ArrowUpOutlined/>:profitYes==0?'':<ArrowDownOutlined/>}
                            />
                    </Card>
                </div>}
                {!loaded && type === 'all' && <h3>This could take a few seconds...</h3>}
                {sport === 'mlb' && type === 'yes' && games.map(game => {
                    const date = game.dateOfGame.split("-");
                    return (
                        // <div className={((game.teamOneWinner === 1 && game.teamToBetOn === game.teamOne) || (game.teamOneWinner === 0 && game.teamToBetOn === game.teamTwo)) ? "gameCard predictedGameTrue" : "gameCard predictedGameFalse"}>
                        <div className={((game.teamOneWinner == 1 && game.teamOnePercentage >= 0.5) || (game.teamOneWinner == 0 && game.teamOnePercentage <= 0.5)) ? "gameCard predictedGameTrue" : "gameCard predictedGameFalse"}>
                            <div>
                                <h2 className={game.teamOneWinner === 0 ? "" : "loser"}>{game.teamTwo}</h2>
                                <h2 className={game.teamOneWinner === 1 ? "" : "loser"}>{game.teamOne}</h2>
                            </div>
                            <div className="gameCardScore">
                                {game.teamTwoScore != null && <h2 className={game.teamOneWinner === 0 ? "" : "loser"}>{game.teamTwoScore}</h2>}
                                {game.teamTwoScore != null && <h2 className={game.teamOneWinner === 1 ? "" : "loser"}>{game.teamOneScore}</h2>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default Results;