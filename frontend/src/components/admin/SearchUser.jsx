import React, { useState } from "react";

const SearchUser = ({onSearch}) => {
  const [search , setSearch] = useState("")


  const handleSearch =()=> {
    onSearch(search)
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-700 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUser;
