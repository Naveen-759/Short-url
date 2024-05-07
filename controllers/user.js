const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { Name, Email, Password } = req.body;
  await User.create({
    Name,
    Email,
    Password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email, Password });
  if (!user)
    return res.render("login", {
      error: "invalid User name or Password",
    });

  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
