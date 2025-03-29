import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, updateUser } from "../../services/api";

export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers(1);
        const foundUser = response.data.find((u) => u.id.toString() === id);
        if (foundUser) setUser(foundUser);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user);
      navigate("/users");
    } catch (err) {
      setError("Failed to update user");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={user.last_name}
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// export { EditUser };
