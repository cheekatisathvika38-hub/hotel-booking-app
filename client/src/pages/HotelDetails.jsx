import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import AvailabilityForm from "../components/AvailabilityForm.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Rating from "../components/Rating.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import getErrorMessage from "../utils/getErrorMessage.js";

function HotelDetails() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const hasDates = Boolean(checkIn && checkOut);

  const [hotel, setHotel] = useState(null);
  const [hotelError, setHotelError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState("");

  // The hotel itself: fetched once per hotel id
  useEffect(() => {
    let ignore = false;

    const fetchHotel = async () => {
      try {
        const res = await api.get(`/hotels/${id}`);
        if (!ignore) setHotel(res.data.hotel);
      } catch (err) {
        if (!ignore) setHotelError(getErrorMessage(err));
      }
    };

    fetchHotel();

    return () => {
      ignore = true;
    };
  }, [id]);

  // The rooms: fetched again whenever the dates change
  useEffect(() => {
    let ignore = false;

    const fetchRooms = async () => {
      setRoomsLoading(true);
      setRoomsError("");

      try {
        const params = hasDates ? { checkIn, checkOut } : {};
        const res = await api.get(`/hotels/${id}/rooms`, { params });
        if (!ignore) setRooms(res.data.rooms);
      } catch (err) {
        if (!ignore) setRoomsError(getErrorMessage(err));
      } finally {
        if (!ignore) setRoomsLoading(false);
      }
    };

    fetchRooms();

    return () => {
      ignore = true;
    };
  }, [id, hasDates, checkIn, checkOut]);

  const handleCheckAvailability = (dates) => {
    setSearchParams({ checkIn: dates.checkIn, checkOut: dates.checkOut });
  };

  const handleClearDates = () => {
    setSearchParams({});
  };

  if (hotelError) {
    return (
      <div className="container">
        <ErrorMessage message={hotelError} />
        <Link to="/hotels" className="btn">Back to hotels</Link>
      </div>
    );
  }

  if (!hotel) return <Loading message="Loading hotel..." />;

  return (
    <div className="container">
      <Link to="/hotels" className="muted">← All hotels</Link>

      {hotel.images.length > 0 && (
        <div className="gallery">
          {hotel.images.slice(0, 3).map((image) => (
            <img key={image} src={image} alt={hotel.name} />
          ))}
        </div>
      )}

      <div className="card-title-row">
        <h1>{hotel.name}</h1>
        <Rating value={hotel.rating} />
      </div>
      <p className="muted">{hotel.address}, {hotel.city} · {hotel.location}</p>
      <p className="hotel-description">{hotel.description}</p>

      <div className="tags">
        {hotel.amenities.map((amenity) => (
          <span key={amenity} className="tag">{amenity}</span>
        ))}
      </div>

      <h2 className="section-title">Rooms</h2>

      {/* key: restart the form's fields if the dates in the URL change */}
      <AvailabilityForm
        key={`${checkIn}|${checkOut}`}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        onSubmit={handleCheckAvailability}
        onClear={handleClearDates}
      />

      <p className="muted">
        {hasDates
          ? `Showing rooms available from ${checkIn} to ${checkOut}.`
          : "Select your dates to see availability and book."}
      </p>

      {roomsLoading && <Loading message="Loading rooms..." />}
      <ErrorMessage message={roomsError} />

      {!roomsLoading && !roomsError && rooms.length === 0 && (
        <div className="empty-state">
          <p>
            {hasDates
              ? "No rooms are available for these dates. Try different dates."
              : "This hotel has no rooms yet."}
          </p>
        </div>
      )}

      {!roomsLoading && !roomsError && rooms.length > 0 && (
        <div className="room-list">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              hotelId={hotel._id}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelDetails;