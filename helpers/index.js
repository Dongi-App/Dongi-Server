const Models = require("../models");

const findOne = async (modelDb, queryObj) =>
  await Models[modelDb].findOne(queryObj).exec();

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};

const updateDocument = async (modelDb, updateQuery, setQuery) =>
  await Models[modelDb].findOneAndUpdate(
    updateQuery,
    { $set: setQuery },
    { new: true }
  );

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const emailSerializer = (email) => {
  return email.toLowerCase();
};

const boolSerializer = (x) => {
  if (typeof x === "boolean") {
    return x;
  }

  if (x.toLowerCase() === "true") {
    return true;
  } else if (x.toLowerCase() === "false") {
    return false;
  } else {
    throw Error("invalid boolean");
  }
};

module.exports = {
  findOne,
  insertNewDocument,
  updateDocument,
  deleteDocument,
  emailSerializer,
  boolSerializer,
};
