import React from 'react'
import {
    Link
  } from "react-router-dom";

export default function ApiResultsList({ apiResponse }) {
    console.log('apilist', apiResponse)

    const allResults = apiResponse.length > 0 ? apiResponse.map(api => 
        <>
        <ul key={api.id}>
            <Link to={`/results/${api.id}`}>{api.first_name} {api.last_name}</Link>
        </ul>
        </>)
        : ""

    console.log('allresults', allResults)

    return (
        <h1>{allResults}test</h1>
        // <div>{allResults}</div>
    )
}