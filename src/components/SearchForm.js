import {
    Link,
    Route
} from "react-router-dom";
import ApiResultsList from './ApiResultsList'

export default function SearchForm({ nameSearch, handleNameChange, handleSubmit, apiResponse }) {
    return (
        <>
            <form>
                <input
                    placeholder="Player Name"
                    type="text"
                    value={nameSearch}
                    onChange={handleNameChange}
                />
                <Link to="/results">
                    <input type="submit" value="Submit" onClick={handleSubmit} />
                </Link>
            </form>

        </>
    )
}