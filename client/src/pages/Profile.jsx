import useAuth from "../hooks/useAuth.js";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>My Profile</h1>
      <div className="card profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default Profile;