const jwt = require("jsonwebtoken");
const secret = "Navi@123";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      Email: user.Email,
      role: user.role,  
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
