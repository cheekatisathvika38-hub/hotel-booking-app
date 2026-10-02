import { Link } from "react-router-dom";

function RoomCard({ room, hotelId, checkIn, checkOut }) {
  const hasDates = Boolean(checkIn && checkOut);
  const image = room.images[0];
  const bookingUrl = `/hotels/${hotelId}/book/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}`;

  return (
    <article className="card room-card">
      {image ? (
        <img src={image} alt={`${room.roomType} room`} className="room-image" />
      ) : (
        <div className="room-image card-image-empty">No image</div>
      )}

      <div className="room-info">
        <h3 className="capitalize">
          {room.roomType} room <span className="muted">#{room.roomNumber}</span>
        </h3>
        <p className="muted">
          Up to {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
        </p>
        {room.description && <p>{room.description}</p>}
        <div className="tags">
          {room.amenities.map((amenity) => (
            <span key={amenity} className="tag">{amenity}</span>
          ))}
        </div>
      </div>

      <div className="room-booking">
        <p className="price">
          ₹{room.pricePerNight.toLocaleString("en-IN")} <span className="muted">/ night</span>
        </p>
        {hasDates ? (
          <Link to={bookingUrl} className="btn btn-primary">Book now</Link>
        ) : (
          <button className="btn" disabled>Select dates to book</button>
        )}
      </div>
    </article>
  );
}

export default RoomCard;