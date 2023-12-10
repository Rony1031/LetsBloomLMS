const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
mongoose.connect("mongodb+srv://20je0804:RohanProject@cluster0.dj669u4.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Book model
const Book = mongoose.model("Book", {
  title: String,
  author: String,
  genre: String,
});

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Endpoint 1: Retrieve All Books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.render("index", { books });
  } catch (error) {
    res.render("index", { books });
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Endpoint 4: Search Books
app.get("/api/books/search", async (req, res) => {
  const searchTerm = req.query.search;
  try {
    let existingBookSet = new Set();
    const booksByTitle = await Book.find({ title: searchTerm.toLowerCase() });
    booksByTitle.forEach(book => existingBookSet.add(JSON.stringify({ title: book.title, author: book.author, genre: book.genre })));
    const booksByAuthor = await Book.find({ author: searchTerm.toLowerCase() });
    booksByAuthor.forEach(book => existingBookSet.add(JSON.stringify({ title: book.title, author: book.author, genre: book.genre })));
    const booksByGenre = await Book.find({ genre: searchTerm.toLowerCase() });
    booksByGenre.forEach(book => existingBookSet.add(JSON.stringify({ title: book.title, author: book.author, genre: book.genre })));
    const existingBook = Array.from(existingBookSet).map(jsonString => JSON.parse(jsonString));
let books = existingBook;
    res.render("search", { books,searchterm:searchTerm });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Endpoint 2: Add a New Book
//redirecting to a new form to add new book to our database
app.get("/addnew", function (req, res) {
  res.render("newform");
});
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    // Validation
    console.log(req.body);
    if (!title || !author || !genre) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Check for duplicate entry
    const existingBook = await Book.findOne({ title: title.toLowerCase() });
    if (existingBook) {
      existingBook.author = author.toLowerCase();
      existingBook.genre = genre.toLowerCase();
      await existingBook.save();
      res.redirect("/api/books");
      return;
    }

    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.redirect("/api/books");
    // res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//redirecting to a editing form to edit a book in our database
app.get("/api/books/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.render("editform", {
      id: book._id,
      title: book.title,
      author: book.author,
      genre: book.genre,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//End Point 3 : Update Book details
//We are using POST instead of PUT because ,
//PUT request is not handled by HTML form ,
//Still we have implemented how the PUT request is handled directly with end point

app.post("/api/books/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;

    await book.save();
    res.redirect("/api/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Handling the delete option
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    res.redirect("/api/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint 3: Update Book Details
// the below is not used in ejs as put is not supported in form
app.put("/api/books/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;

    await book.save();
    res.redirect("/api/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("*", async (req, res) => {
  try {
    res.redirect("/api/books");
  } catch (error) {
    res.render("index", { books });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
