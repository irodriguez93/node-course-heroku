const path = require("path"); // this gets the path of the files stored on the PC
const express = require("express"); // This is used for routing
const hbs = require("hbs"); //template engine
const geocode = require("./utils/geocode"); // think of method importing it for use here
const forecast = require("./utils/forecast"); // think of method importing it for use here
const port = process.env.PORT || 3000; // 80 is http 443 is https    `

// Define paths for express config
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public"); //saying here is the public folder you have access to
const viewsPath = path.join(__dirname, "../templates/views"); //only have access to templates/views
const partialsPath = path.join(__dirname, "../templates/partials"); //only have access to templates/ partials

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Irving Rodriguez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Irving Rodriguez",
  });
});
app.get("/test", (req, res) => {
  res.render("about", {
    title: "test",
    name: "robert test",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    description: "This is a help page to help you understand the application",
    name: "Irving Rodriguez",
  });
});

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Dood',
//         age: 25
//     },
//     {
//         name: 'Sir',
//         age: 23
//     }]

//     )
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const address = req.query.address;
  geocode(address, (error, { lattitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lattitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Ypou must prove a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "HELP ARTICLE NOT FOUND",
    name: "Irving Rodriguez",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "PAGE NOT FOUND 404",
    name: "Irving Rodriguez",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
