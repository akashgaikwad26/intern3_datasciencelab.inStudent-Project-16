import { collab_icon } from "assets/images/ExportImages";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./admindashboard.scss";

const AdminDashboard = ({ username }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `http://localhost:8000/projects?userId=${formData.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Project created successfully!");
      setFormData({ name: "", description: "", deadline: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };
  function handleLogout() {
    localStorage.removeItem("userDetails");
  }

  return (
    <section className="admin-dashboard">
      <header className="admin-dashboard-header">
        <section className="admin-dashboard-header-left">
          <img
            src={collab_icon}
            alt="collab_icon"
          />
          <h1>{username}</h1>
        </section>
        <Link
          to="/"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </header>
      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>UserId:</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <button
          className="submit-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </section>
  );
};

export default AdminDashboard;
