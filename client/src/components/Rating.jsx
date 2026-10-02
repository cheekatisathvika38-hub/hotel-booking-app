function Rating({ value }) {
  if (!value) return <span className="muted">New</span>;

  return <span className="rating">★ {value.toFixed(1)}</span>;
}

export default Rating;