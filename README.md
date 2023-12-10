
# Library System

The Library System is a simple web application built using Node.js, Express, and MongoDB. It allows users to manage a library by performing basic CRUD operations on books.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Access](#access)
- [Endpoints](#endpoints)
- [Usage](#usage)

## Features

- Retrieve a list of all books in the library
- Add a new book to the library
- Update details of a specific book in the library
- Search for books based on titles, authors, or genres
- Delete a specific book from the library

## Project Structure

```
project-root
│
├── public
│   └── styles
│       └── styles.css
│
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── newform.ejs
|   ├── search.ejs
│   └── editform.ejs
│
└── app.js
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/library-system.git
   cd library-system
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Endpoints

### 1. Retrieve All Books

- **Endpoint:** `GET /api/books`
- **Description:** Retrieves a list of all books in the library.

#### Sample Request

```bash
curl http://localhost:3000/api/books
```

### 2. Add a New Book

- **Endpoint:** `POST /api/books`
- **Description:** Adds a book to the library.

#### Sample Request

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "1984", "author": "George Orwell", "genre": "Dystopian"}' http://localhost:3000/api/books
```

### 3. Update Book Details

- **Endpoint:** `POST /api/books/:id`
- **Description:** Changes book details in the library.

#### Sample Request

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "The New Title", "author": "New Author", "genre": "New Genre"}' http://localhost:3000/api/books/609d118f1c9d440000000001
```

### 4. Search Books

- **Endpoint:** `GET /api/books/search`
- **Description:** Searches for books based on the provided search term (case-insensitive). The search term is matched against book titles, authors, and genres.

#### Sample Request

```bash
curl http://localhost:3000/api/books/search?search=science
```

### 5. Delete Book

- **Endpoint:** `GET /delete/:id`
- **Description:** Deletes a specific book from the database.

#### Sample Request

```bash
curl http://localhost:3000/delete/609d118f1c9d440000000001
```

## Usage

### Searching for Books

To search for books, use the `/api/books/search` endpoint by providing a search term in the query parameter.

Example:

```bash
curl http://localhost:3000/api/books/search?search=science
```
