import {
    useParams
} from 'react-router-dom'
import React, { useState } from "react";
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StatsButtons from './StatsButtons'

const useStyles = makeStyles({
    table1: {
        minWidth: 650,
    },
    table2: {
        maxWidth: 600,
    }
});

function PlayerPage({ apiResponse }) {
    const [statsDisplay, setStatsDisplay] = useState({})
    const [year, setYear] = useState("")
    const [game, setGame] = useState([])


    const params = useParams()
    const player = apiResponse.find(id => id.id === Number(params.id))
    if (player) {
        var playerId = player.id
    }
    const today = moment().format("YYYY-MM-DD")
    const todayNoYear = moment().format("MM-DD")
    const weekAgo = moment().subtract(7, 'd').format("YYYY-MM-DD")
    const onThisDate = `${year}-${todayNoYear}`
    console.log('onthisdate', onThisDate)
    const apiCallToday = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&dates[]=${today}`
    const apiCallWeek = 'https://www.balldontlie.io/api/v1/stats?player_ids[]=' + playerId + '&start_date=' + weekAgo + '&end_date=' + today
    const apiCallOnThisDate = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&dates[]=${onThisDate}`
    console.log('playerid', player)
    console.log('apiresponseplayer', apiResponse)

    const handleTodaysStatsSubmit = async (event) => {
        event.preventDefault()
        console.log('today', today)
        console.log('fetch', apiCallToday)

        try {
            const response = await fetch(apiCallToday)
            const results = await response.json()
            console.log('results', results)
            console.log('results.data', results.data)
            setStatsDisplay(results.data)
            console.log('statsDisplay', statsDisplay)
        } catch (err) {
            console.log(err)
        }

    }

    const handleWeeksStatsSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(apiCallWeek)
            const results = await response.json()
            console.log('results', results)
            console.log(apiCallWeek)
            setStatsDisplay(results.data)
        } catch (err) {
            console.log(err)
        }

    }

    const handleYearChange = event => {
        console.log(event.target.value)
        setYear(event.target.value)
        console.log(year)
    }

    const handleOnThisDate = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(apiCallOnThisDate)
            const results = await response.json()
            console.log('results', results.data)
            console.log(apiCallOnThisDate)
            setStatsDisplay(results.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetGameScore = async () => {
        const gameId = statsDisplay[0].game.id
        console.log('gameid', gameId)
        const apiGame = `https://www.balldontlie.io/api/v1/games/${gameId}`
        console.log('game', apiGame)
        try {
            const response = await fetch(apiGame)
            const results = await response.json()
            console.log('results', results)
            const newArray = []
            newArray.push(results)
            setGame(newArray)
        } catch (err) {
            console.log(err)
        }
    }

    console.log('game', game)

    const gameStats = game.length > 0 ? game.map(gameI =>
        <>
        {gameI.visitor_team.full_name}: {gameI.visitor_team_score}<br></br>
        {gameI.home_team.full_name}: {gameI.home_team_score}
        </>
        ) : ""


    // const yesterday = moment().subtract(1, 'd').format("YYYY-MM-DD")
    // console.log('1 week', weekAgo)
    // const apiCall = 
    const classes = useStyles();

    if (player) {
        var playerBio =
            <TableContainer component={Paper}>
                <Table className={classes.table1} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h1>{player.first_name} {player.last_name}</h1></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={player.id}>
                            <TableCell align="left">Height: {player.height_feet}'{player.height_inches}"</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Weight: {player.weight_pounds}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Position: {player.position}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Team: {player.team.full_name}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    }

    const stats = statsDisplay.length > 0 ? statsDisplay.map(stat =>
        <TableContainer component={Paper}>
            <Table className={classes.table2} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date: {stat.game.date}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">
                            Points:
                        </TableCell>
                        <TableCell align="left">
                            {stat.pts}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            FG:
                        </TableCell>
                        <TableCell align="left">
                            {stat.fgm}/{stat.fga} ({stat.fg_pct}%)
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            3pt FG:
                        </TableCell>
                        <TableCell align="left">
                            {stat.fg3m}/{stat.fg3a} ({stat.fg3_pct}%)
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Rebounds:
                        </TableCell>
                        <TableCell align="left">
                            {stat.reb}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Assists:
                        </TableCell>
                        <TableCell align="left">
                            {stat.ast}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Steals:
                        </TableCell>
                        <TableCell align="left">
                            {stat.stl}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Blocks:
                        </TableCell>
                        <TableCell align="left">
                            {stat.blk}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Turnovers:
                        </TableCell>
                        <TableCell align="left">
                            {stat.turnover}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            Minutes played:
                        </TableCell>
                        <TableCell align="left">
                            {stat.min}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            <button onClick={handleGetGameScore}>Get game score</button>
                        </TableCell>
                        <TableCell align="left">
                           {gameStats}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>)
        : ""



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    {playerBio}
                </Grid>
                <Grid item xs={6}>
                    <StatsButtons
                        handleTodaysStatsSubmit={handleTodaysStatsSubmit}
                        handleWeeksStatsSubmit={handleWeeksStatsSubmit}
                        handleYearChange={handleYearChange}
                        handleOnThisDate={handleOnThisDate}
                        year={year}
                    />
                    {stats}
                </Grid>
            </Grid>
        </div >
    )

}

export default PlayerPage