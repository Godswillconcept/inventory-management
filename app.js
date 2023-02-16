const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/userRoute");
const vendorRoute = require("./routes/vendorRoute");
const itemRoute = require("./routes/itemRoute");
const supplyRoute = require("./routes/supplyRoute");
const returnRoute = require("./routes/returnRoute");
const donationRoute = require("./routes/donationRoute");
const saleRoute = require("./routes/saleRoute");
const leaseRoute = require("./routes/leaseRoute");
const damageRoute = require("./routes/damageRoute");
const consumptionRoute = require("./routes/consumptionRoute");
const useRoute = require("./routes/useRoute");
const repairRoute = require("./routes/repairRoute");
const replacementRoute = require("./routes/replacementRoute");
const Item = require("./models/Item");
const Supply = require("./models/Supply");
const Return = require("./models/Return");

const Donation = require("./models/Donation");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// Body parser
app.use(express.urlencoded({ extended: true }));

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

// test
app.post("/submit", (req, res) => {
  //Access the data sent in the request
  var data = req.body;
  // Send response
  res.json(data);
});

// routes
app.use(userRoute);
app.use(vendorRoute);
app.use(itemRoute);
app.use(supplyRoute);
app.use(returnRoute);
app.use(donationRoute);
app.use(saleRoute);
app.use(leaseRoute);
app.use(useRoute);
app.use(damageRoute);
app.use(consumptionRoute);
app.use(repairRoute);
app.use(replacementRoute);
app.get("/", (req, res) => res.render("index"));
const PORT = process.env.PORT || 4000;

app.listen(PORT);
