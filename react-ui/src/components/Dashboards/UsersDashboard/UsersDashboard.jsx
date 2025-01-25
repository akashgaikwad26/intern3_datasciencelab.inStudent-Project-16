import { collab_icon } from "assets/images/ExportImages";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parse } from "utils/parse";
import { split } from "utils/split";
import "./userdashboard.scss";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const details = parse(localStorage.getItem("userDetails"));
  const { id: userId, username } = details;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects?userId=${userId}`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  function handleLogout() {
    localStorage.removeItem("userDetails");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <section className="dashboard-header-left">
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
      <div className="projects-container">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.project_id}
          >
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Deadline: {split(project.deadline, "T")[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
