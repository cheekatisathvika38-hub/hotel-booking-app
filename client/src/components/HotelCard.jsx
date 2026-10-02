import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";

function HotelCard({ hotel }) {
  const image = hotel.images[0];

  return (
    <article className="card hotel-card">
      {image ? (
        <img src={image} alt={hotel.name} className="card-image" />
      ) : (
        <div className="card-image card-image-empty">No image</div>
      )}

      <div className="card-body">
        <div className="card-title-row">
          <h3>{hotel.name}</h3>
          <Rating value={hotel.rating} />
        </div>
        <p className="muted">{hotel.location}, {hotel.city}</p>

        <div className="tags">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="tag">{amenity}</span>
          ))}
        </div>

        <Link to={`/hotels/${hotel._id}`} className="btn btn-primary">
          View details
        </Link>
      </div>
    </article>
  );
}

export default HotelCard;