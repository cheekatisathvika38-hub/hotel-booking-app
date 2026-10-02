import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import SearchBar from "../components/SearchBar.jsx";
import HotelList from "../components/HotelList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import getErrorMessage from "../utils/getErrorMessage.js";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const minRating = searchParams.get("minRating") || "";

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Re-fetch whenever the filters in the URL change
  useEffect(() => {
    let ignore = false; // set to true if this effect is replaced before it finishes

    const fetchHotels = async () => {
      setLoading(true);
      setError("");

      const params = {};
      if (search) params.search = search;
      if (minRating) params.minRating = minRating;

      try {
        const res = await api.get("/hotels", { params });
        if (!ignore) setHotels(res.data.hotels);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchHotels();

    return () => {
      ignore = true;
    };
  }, [search, minRating]);

  const handleSearch = (values) => {
    const params = {};
    if (values.search.trim()) params.search = values.search.trim();
    if (values.minRating) params.minRating = values.minRating;
    setSearchParams(params);
  };

  return (
    <div className="container">
      <h1>Hotels</h1>

      {/* key: when the URL filters change (e.g. Back button), the bar restarts with the right values */}
      <SearchBar
        key={`${search}|${minRating}`}
        initialSearch={search}
        initialMinRating={minRating}
        onSearch={handleSearch}
      />

      {loading && <Loading message="Loading hotels..." />}
      <ErrorMessage message={error} />
      {!loading && !error && <HotelList hotels={hotels} />}
    </div>
  );
}

export default Hotels;