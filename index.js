const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

let genres = [
  { id: 1, genre_name: "Action" },
  { id: 2, genre_name: "Horror" },
  { id: 3, genre_name: "Comedy" },
  { id: 4, genre_name: "Thriller" },
  { id: 5, genre_name: "Historical" },
  { id: 6, genre_name: "Fantasy" },
  { id: 7, genre_name: "Animation" },
  { id: 8, genre_name: "Crime" },
  { id: 9, genre_name: "Science Fiction" },
  { id: 10, genre_name: "Romance" },
];

// Read the genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Create new genre
app.post("/api/genres", (req, res) => {
  const { error } = validateGenreName(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genre_name: req.body.genre_name,
  };
  genres.push(genre);
  res.send(genre);
});

// Update an existing genre
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("The genre is invalid.");

  const { error } = validateGenreName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre_name = req.body.genre_name;
  res.send(genre);
});

// Delete an existing genre
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("The genre is invalid.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// Validate genre name using Joi
function validateGenreName(genre_name) {
  const schema = Joi.object({
    genre_name: Joi.string().min(3).required(),
  });
  return schema.validate(genre_name);
}

const port = process.env.port || 5050;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
