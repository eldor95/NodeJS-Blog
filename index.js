const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllerrs/HomePageController");
const postIdPageController = require("./controllerrs/postIdPageController");
const postNewPageController = require("./controllerrs/PostNewPageController");
const postCreatePageController = require("./controllerrs/PostCreatePageController");
const createUserController = require("./controllerrs/CreateUser");
const userRegistrationController = require("./controllerrs/UserReg");
const loginController = require("./controllerrs/login");
const loginStoreController = require("./controllerrs/loginStore");
const logoutController = require("./controllerrs/logout");

const app = express();

const MongoUrl =
  "mongodb+srv://eldor:yidp8zKVvgzIRPrK@cluster1.drxchqg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MongoUrl);

const middleware = require("./middleware/storePost");
const authMiddleware = require("./middleware/auth");

app.use(
  expressSession({
    secret: "eldor",
    store: mongoStore.create({ mongoUrl: MongoUrl }), // mongo DB ga session ulayapmiz
  })
);
app.use(connectFlash());
app.use(fileUpload()); // file yuklash uchun
app.use(express.static("public")); // public ni static qilyapmiz
app.use(expressEdge.engine); //expess-edge engine  ulayapmiz
app.set("views", `${__dirname}/views`); // view ni asosiy papka qilib olyapmiz
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);
app.get("/post/:id", postIdPageController);
app.get("/posts/new", authMiddleware, postNewPageController);
app.post("/post/create", authMiddleware, middleware, postCreatePageController);
app.get("/reg", createUserController);
app.post("/auth/reg", userRegistrationController);
app.get("/login", loginController);
app.post("/auth/log", loginStoreController);
app.get("/logout", logoutController);
app.use((req, res) => res.render("not_found"));

app.listen(5000, () => {
  console.log("server is running...");
});
