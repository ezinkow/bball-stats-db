export default function SearchForm({ nameSearch, handleNameChange, handleSubmit }) {
    return (
        <div className="searchForm">
            <form>
                <label for='player name'><h3>Search for player to get stats:  </h3></label>
                <input
                    placeholder="Player Name"
                    type="text"
                    value={nameSearch}
                    onChange={handleNameChange}
                />
                    <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}