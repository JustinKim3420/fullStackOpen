import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./components/SearchResults";

function App() {
  const [filter, updateFilter] = useState("");
  const [searchResults, updateSearchResults] = useState([]);

  const filteredResults = searchResults.filter((searchItem) => {
    return searchItem.name.toLowerCase().includes(filter.toLowerCase());
  });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      updateSearchResults(response.data);
    });
  }, []);

  const handleChange = (event) => {
    updateFilter(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleChange} />
      </div>
      {/* Assures that there is a filter and the filtered results is not empty */}
      {filter === "" ? (
        <div>Please enter a filter to see search results</div>
      ) : filteredResults.length>0?(
        <SearchResults results={filteredResults} updateFilter={updateFilter}/>
      ): <div>No countries that contain the filter</div>}
    </div>
  );
}

export default App;
