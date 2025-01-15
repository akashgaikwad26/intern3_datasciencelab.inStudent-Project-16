const COLLAB_SCHEMA = "collabration"; // use real schema name here

const USERS = "users";
const PROJECTS = "projects";
const TASKS = "tasks";
const MESSAGES = "messages";
const NOTIFICATIONS = "notifications";

function getTableName(TABLE_NAME) {
  return `${COLLAB_SCHEMA}.${TABLE_NAME}`;
}

const TABLE_USERS = () => getTableName(USERS);
const TABLE_PROJECTS = () => getTableName(PROJECTS);
const TABLE_TASKS = () => getTableName(TASKS);
const TABLE_MESSAGES = () => getTableName(MESSAGES);
const TABLE_NOTIFICATIONS = () => getTableName(NOTIFICATIONS);

module.exports = {
  TABLE_USERS,
  TABLE_PROJECTS,
  TABLE_TASKS,
  TABLE_MESSAGES,
  TABLE_NOTIFICATIONS,
};
