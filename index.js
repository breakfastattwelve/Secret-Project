// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";

app.use(bodyParser.urlencoded({ extended: true }));

// 3. Use the public folder for static files.
app.use(express.static("public"));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    const jsonData = JSON.stringify(result);
    res.render("index.ejs", {
      secret: result.secret,
      user: result.username,
    });
  } catch(error){
    console.log(error.response.data);
    res.status(500);
  }
});
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express app for Vercel
export default app;
