const Models = require("../models");

const findOne = async (modelDb, queryObj) =>
  await Models[modelDb].findOne(queryObj).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

module.exports = {
  findOne,
  insertNewDocument,
};
