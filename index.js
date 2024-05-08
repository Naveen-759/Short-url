const express = require("express");
const { connectToMongooDB } = require("./connect");

const cookieParser = require("cookie-parser");

const { checkForAuthentication } = require("./middleware/auth");

const dotenv = require("dotenv").config();

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;
const path = require("path");
connectToMongooDB(process.env.MONGOO_URL).then(() =>
  console.log("Connected to mongodb!!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrhl);
});
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
