export default function SearchForm({ nameSearch, handleNameChange, handleSubmit }) {
    return (
        <>
            <form>
                <label for='player name'>Search for player to get stats:  </label>
                <input
                    placeholder="Player Name"
                    type="text"
                    value={nameSearch}
                    onChange={handleNameChange}
                />
                    <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>

        </>
    )
}