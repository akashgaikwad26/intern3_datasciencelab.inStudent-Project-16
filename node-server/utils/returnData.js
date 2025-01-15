function returnData(res, result) {
  res.status(201).json(result.rows[0]);
}
module.exports = { returnData };
