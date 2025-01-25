const { TABLE_PROJECTS } = require("../../Constants/Constants");
const pool = require("../../utils/GetPool");
const error = require("../../utils/error");
const { sendResponse } = require("../../utils/sendResponse");

async function createNewProject(req, res) {
  const { name, description, deadline, userid} = req.body;
  try {
    
    const result = await pool.query(
      `INSERT INTO ${TABLE_PROJECTS()} (name, description, deadline, created_by) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, deadline, userid]
    );
    // sendResponse(res, result);
  } catch (err) {
    console.log(err)

    // error(res, 500, err.message);
  }
}
// createNewProject({body:{name:'Demo project 2',description:'This is an demo project2',deadline:'2025-01-25', userid:1}})
module.exports = {
  createNewProject,
};
