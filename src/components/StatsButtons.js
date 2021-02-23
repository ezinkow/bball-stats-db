export default function StatsButtons({ handleTodaysStatsSubmit, handleWeeksStatsSubmit, year, handleYearChange, handleOnThisDate }) {
    return (
        <div className="statsButtons">
            <input
                type="submit"
                value="Today's stats"
                onClick={handleTodaysStatsSubmit}
                className="buttons"
            />
            <input
                type="submit"
                value="Stats over last week"
                onClick={handleWeeksStatsSubmit}
                className="buttons"
            />
            <label for="year" className="buttons">| On this day in:</label>
            <input
                placeholder="YYYY"
                type="text"
                value={year}
                maxLength='4'
                minLength='4'
                onChange={handleYearChange}
                size='4'
                className="buttons"
                
            />
            <input
                type="submit"
                value="On this date"
                onClick={handleOnThisDate}
                className="buttons"
            />

        </div>
    )
}