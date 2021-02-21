import{
    useParams
} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import moment from 'moment'

function PlayerPage({apiResponse}) {
    const [todaysStats, setTodaysStats] = useState({})

    const params = useParams()
    const player = apiResponse.find(id => id.id === Number(params.id))
    console.log('playerid', player)
    // console.log('apiresponse', apiResponse)
    // console.log('test', test)
    console.log('apiresponseplayer', apiResponse)

    const handleTodaysStatsSubmit = async (event) => {
        event.preventDefault()
        const playerId = player.id
        const today = moment().format("YYYY-MM-DD")
        console.log('today', today)
        const apiCall = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&dates[]=${today}`
        console.log('fetch', apiCall)
    }
    
    // const weekAgo = moment().subtract(7, 'd').format("YYYY-MM-DD")
    // console.log('1 week', weekAgo)
    // const apiCall = `https://www.balldontlie.io/api/v1/stats?player_ids[]=447&start_date=' + weekAgo + '&end_date=' + today`

    if (player) {
       var playerBio =
       <>
       <h1>{player.first_name} {player.last_name}</h1>
       <ul>
        <p>Height: {player.height_feet}'{player.height_inches}"</p>
        <p>Weight: {player.weight_pounds}</p>
        <p>Position: {player.position}</p>
        <h3>Team: {player.team.full_name}</h3>
       </ul>
       </>
}

    return (
        < div>
            <h1>{playerBio}</h1>
            <input
            type="submit"
            value="Today's stats"
            onClick={handleTodaysStatsSubmit}
            />
        </div >


    )

    // console.log('stats', stats)
}

export default PlayerPage