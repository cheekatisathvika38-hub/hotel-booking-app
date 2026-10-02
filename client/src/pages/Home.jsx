import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="container">
        <h1>Find your perfect stay</h1>
        <p>Browse hotels, pick your dates, and book a room in a few clicks.</p>
        <Link to="/hotels" className="btn btn-primary">Browse hotels</Link>
      </div>
    </section>
  );
}

export default Home;