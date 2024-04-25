import React, { useState } from 'react'

function Search({search,setSearch,handleSearch}) {

    // const[search,setSearch] = useState("")

  return (
    <div className="search-engine">
        <input type="text" placeholder='Enter city name' name='search' value={search} onChange={(event) => setSearch(event.target.value)}/>
        <button className="search-btn" onClick={handleSearch}> Search</button>
    </div>
  )
}

export default Search