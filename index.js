const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;


// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Middleware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Call the next middleware/route handler
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.post("/submit", (req, res) => {
  console.log(req.body.data); // Log the submitted data
  res.send("Success"); // Send a response
});


// Route to download the image
app.get('/download', function(req, res) {
    const file = __dirname + '/images/images (1).jpg'; // Path to the image
    res.download(file, "images (1).jpg", (err) => {
      if (err) {
        console.error("Error while downloading file:", err);
        res.status(500).send("Error while downloading the file.");
      }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

