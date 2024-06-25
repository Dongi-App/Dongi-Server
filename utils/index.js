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
  emailSerializer,
  boolSerializer,
};
