import React, { useState } from "react";
import drugsearch from "./drugsearch";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [query, setQuery] = useState('')
    const { brand, error, loading } = drugsearch(query)

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }
    return (
        <>
            <div className='App'>
                <input type="text" onChange={handleSearch} value={query} />
                <div>{loading && 'Loading...'}</div>

                {brand.map(drug =>(<p key={drug}><Link to="/info">{drug}</Link></p>))}
                <div>{error && 'No matches found!'}</div>
            </div>
        </>
    )
}

export default Dashboard

