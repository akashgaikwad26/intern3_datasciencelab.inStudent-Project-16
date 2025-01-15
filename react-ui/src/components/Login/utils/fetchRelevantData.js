import axios from "axios";

export const fetchRelevantData = async (setProjects, setTasks, setMessages) => {
  try {
    const [projectsRes, tasksRes, messagesRes] = await Promise.all([
      axios.get("/api/projects"),
      axios.get("/api/tasks"),
      axios.get("/api/messages"),
    ]);

    setProjects(projectsRes.data);
    setTasks(tasksRes.data);
    setMessages(messagesRes.data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
