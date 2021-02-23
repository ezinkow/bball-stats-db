import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from './components/Header';
import './App.css';
import PlayerPage from './components/PlayerPage.js'
import SearchForm from "./components/SearchForm";
import ApiResultsList from './components/ApiResultsList'

function App() {
  const [nameSearch, setNameSearch] = useState("")
  const [apiResponse, setApiResponse] = useState([])

  const handleNameChange = event => {
    console.log(event.target.value);
    setNameSearch(event.target.value);
  };
  useEffect(() => {
    console.log(nameSearch)
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const apiCall = `https://www.balldontlie.io/api/v1/players?search=${nameSearch}&per_page=100`

    try {
      const response = await fetch(apiCall)
      const results = await response.json()
      console.log('results', results)
      console.log('api call', apiCall)
      setApiResponse(results.data)
    } catch (err) {
      console.log(err)
    }
    setNameSearch("")
    return (
      <ApiResultsList
        apiResponse={apiResponse} />
    )
  }

  return (
    <Router>

      <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Header />
        </Link>
      </nav>
      <div className="container">
        <Switch>
          <Route path='/results/:id'>
            <PlayerPage
              apiResponse={apiResponse} />
          </Route>
          <Route path='/bball-stats-db'>
            <SearchForm
              nameSearch={nameSearch}
              handleNameChange={handleNameChange}
              handleSubmit={handleSubmit}
              apiResponse={apiResponse}
            />
            <ApiResultsList
              apiResponse={apiResponse} />
          </Route>
          <Route exact path="/bball-stats-db">
            <SearchForm
              nameSearch={nameSearch}
              handleNameChange={handleNameChange}
              handleSubmit={handleSubmit}
              apiResponse={apiResponse}
            />
            <ApiResultsList
              apiResponse={apiResponse} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
