// Renders nothing when there is no error, so pages can always include it
function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-message" role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;