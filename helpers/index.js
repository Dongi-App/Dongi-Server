const Models = require("../models");

const checkMembership = async (group, user) => {
  if (!group || !user) {
    throw new Error("user is not a member of group");
  }
  const membership = await findOne("membership", {
    group,
    user,
  });
  if (!membership) {
    throw new Error(`user (${user}) is not a member of group (${group})`);
  }
};

const checkExpenseOwnership = async (expense_id, user) => {
  const expense = await findOne("expense", {
    _id: expense_id,
  });
  const group = await findOne("group", {
    _id: expense?.group,
  });
  await checkMembership(group?._id, user).catch(() => {
    throw new Error("can't access expense");
  });

  return [expense, group];
};

const find = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();

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

module.exports = {
  checkMembership,
  checkExpenseOwnership,
  find,
  findOne,
  insertNewDocument,
  updateDocument,
  deleteDocument,
};
