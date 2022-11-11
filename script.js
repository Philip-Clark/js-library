// ? page load event listener
addEventListener('load', loadBooks);

// ? Book object
function Book(name, author, pageCount, read = false) {
  this.title = name;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.name} by ${this.author}, ${this.pageCount} pages, ${
    this.read ? 'read' : 'not read yet'
  }`;
};

Book.prototype.SayAuthor = function () {
  console.log(this.author);
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// ? Library  object
function Library(books = []) {
  this.books = books;
}

Library.prototype.addBookToLibrary = function (book) {
  this.books.push(book);
};

Library.prototype.addBooksToLibrary = function (books = []) {
  books.forEach((book) => {
    this.books.push(book);
  });
};

Library.prototype.displayBooks = function (parentId = 'library') {
  const parent = document.getElementById(parentId);
  parent.innerHTML = '';

  this.books.forEach((book, index) => {
    console.log(index);
    parent.insertAdjacentHTML('beforeend', generateBookHtml(book, index));
  });
};
// End

// render books
function generateBookHtml(book, index) {
  return `
    <li class='bookCard' id="${index}">
      <h2 class='bookTitle'>${book.title}</h2>
      <h3 class='bookAuthor'>${book.author}</h3>
      <p class='pageCount'>${book.pageCount}</p>
      <button class="readBook" read="${book.read}" onclick="updateRead(${index})">Read</button>
      <button class="readBook" onclick="deleteBook(${index})">remove</button>
    </li >
    `;
}

function updateRead(index) {
  myLibrary.books[index].toggleRead();
  myLibrary.displayBooks();
}

function deleteBook(index) {
  myLibrary.books.splice(index, 1);
  myLibrary.displayBooks();
}

// ? new library with 2 books

const bookA = new Book('Twenty Thousand Leagues Under the Seas', 'Jules Verne', 518, true);
const bookB = new Book('Around the world in Eighty Days', 'Jules Verne', 255, true);
const bookC = new Book('To the center of the Earth', 'Jules Verne', 255, true);
const bookD = new Book('Mysterious Cavern', 'Jules Verne', 255, true);
const bookE = new Book('Isaacs Storm', 'Erik Larson', 255, true);
const bookF = new Book('Five weeks in a Balloon', 'Jules Verne', 255, false);
const bookG = new Book('Dictionary', 'Erik Larson', 9000, false);
const bookH = new Book('Madrid Codex', 'Maya', 112, false);
const myLibrary = new Library([bookA, bookB, bookC, bookD, bookE, bookF, bookG, bookH]);

function loadBooks() {
  myLibrary.displayBooks('library');
}

// ? Add Book form
document.getElementById('addForm').addEventListener('submit', (event) => {
  myLibrary.addBookToLibrary(parseFormData(event));
  myLibrary.displayBooks('library');
  dialog.showModal();
});

function parseFormData(event) {
  const title = event.target.elements.title.value;
  const author = event.target.elements.author.value;
  const pageCount = event.target.elements.pageCount.value;
  const read = event.target.elements.read.checked;

  return { title, author, pageCount, read };
}

const dialog = document.getElementById('addBookDialog');

document.getElementById('addBook').addEventListener('click', (event) => {
  console.log('test');
  dialog.showModal();
});