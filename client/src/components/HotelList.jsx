import HotelCard from "./HotelCard.jsx";

function HotelList({ hotels }) {
  if (hotels.length === 0) {
    return (
      <div className="empty-state">
        <p>No hotels match your search.</p>
      </div>
    );
  }

  return (
    <>
      <p className="muted">{hotels.length} {hotels.length === 1 ? "hotel" : "hotels"} found</p>
      <div className="grid">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </>
  );
}

export default HotelList;