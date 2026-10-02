import { useState } from "react";

function SearchBar({ initialSearch, initialMinRating, onSearch }) {
  const [search, setSearch] = useState(initialSearch);
  const [minRating, setMinRating] = useState(initialMinRating);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search, minRating });
  };

  const handleClear = () => {
    setSearch("");
    setMinRating("");
    onSearch({ search: "", minRating: "" });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="form-group search-grow">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Hotel name, city or area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="minRating">Minimum rating</label>
        <select
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="">Any</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="4.5">4.5+ stars</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn" onClick={handleClear}>Clear</button>
      </div>
    </form>
  );
}

export default SearchBar;