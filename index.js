const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

// Sets the view engine to EJS and create views folder
app.set("view engine", "ejs");

// middleware to send static files
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

// connection string
const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.ajilfvi.mongodb.net/barbershop?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());

mongoose.connect(mongoDBConnectionString).then(() => {
  console.log("MongoDB connected...");
});

// appointment schema
const appointmentSchema = new mongoose.Schema({
  location: { type: String },
  date: { type: Date, required: true },
  client: { type: String, required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
});

// appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema);

// service schema
const serviceSchema = new mongoose.Schema({
  type: { type: String },
  cost: { type: Number, required: true },
  age: { type: Number, required: true },
  image:{type:String,required:true}
});

// service model
const Service = mongoose.model("Service", serviceSchema);

// appointments post route
app.post("/appointments", (req, res) => {
  const appointment = new Appointment({
    date: req.body.date,
    client: req.body.client,
    service_id: req.body.service_id,
  });
  appointment.save().then((newappoint) => {
    res.json(newappoint);
  });
});

// appointment get route
app.get("/barbershop/:appointment", (req, res) => {
  const filter = { appointment: req.params.appointment };
  Appointment.findOne(filter).then((appointment) => {
    res.render("appointments.ejs", { Appointment: appointment });
  });
});

// delete appointment by unique id
app.delete("/appointments/:id", (req, res) => {
  const filter = { _id: req.params.id };

  Appointment.findOneAndDelete(filter)
    .then((removeApp) => {
      res.json(removeApp);
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete services
app.delete("/services/:id", (req, res) => {
  const filter = { _id: req.params.id };

  Service.findOneAndDelete(filter)
    .then((removeApp) => {
      res.json(removeApp);
    })
    .catch((error) => {
      console.log(error);
    });
});

//update service by unigue id
app.patch("/services/:_id", (req, res) => {
  const filter = { _id: req.params._id };
  const update = { date: req.body.date };

  Item.findOneAndUpdate(filter, update, { new: true }).then((upd) => {
    res.json(upd);
  });
});

//appointments update route
app.patch("/appointments/:_id", (req, res) => {
  const filter = { _id: req.params._id };
  const update = { name: req.body.name };

  Item.findOneAndUpdate(filter, update, { new: true }).then((upd) => {
    res.json(upd);
  });
});
// service post route
app.post("/service", (req, res) => {
  console.log(req.body);
  const service = new Service({
    type: req.body.type,
    cost: req.body.cost,
    age: req.body.age,
    image:req.body.image
  });
  service.save().then((s1) => {
    res.json(s1);
  });
});

// service get route
app.get("/services", (req, res) => {
  const filter = {};
  Service.find(filter).then((data) => {
    res.render("services.ejs", { services: data });
  });
});

app.get("/admin/services", (req, res) => {
  const filter = {};
  Service.find(filter).then((data) => {
    res.render("adminServices.ejs", { services: data });
  });
});


app.get("/addappointment", (req, res) => {
  res.sendFile(__dirname + "/public/addappointments.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/appointments", (req, res) => {
  const filter = {};
  Appointment.find(filter)
    .sort({ date: -1 })
    .then((data) => {
      res.render("appointments.ejs", { appointments: data });
    });
});
// server start up
app.listen(3000, () => {
  console.log("Server running.");
});
