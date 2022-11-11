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
  this.books.push(new Book(book.title, book.author, book.pageCount, book.read));
};

Library.prototype.addBooksToLibrary = function (books = []) {
  books.forEach((book) => {
    this.addBookToLibrary(book);
  });
};

Library.prototype.displayBooks = function (parentId = 'library') {
  const parent = document.getElementById(parentId);
  let newInnerHTML = '';
  parent.innerHTML = '';

  this.books.forEach((book, index) => {
    newInnerHTML += generateBookHtml(book, index);
  });

  parent.insertAdjacentHTML('beforeend', newInnerHTML);
  bake_cookie('library', this);
};
// End

// render books
function generateBookHtml(book, index) {
  return `
    <li class='bookCard' id="${index}">
      <div>
        <h2 class='bookTitle'>${book.title}</h2>
          <h3 class='bookAuthor'>Author: ${book.author}</h3>
          <p class='pageCount'>Pages: ${book.pageCount}</p>
      </div>
      <div>
        <button class="readBook" read="${book.read}" onclick="updateRead(${index})">${
    book.read ? 'Read' : 'Unread'
  }</button>
        <button class="readBook" onclick="deleteBook(${index})">remove</button>
      </div>
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
let myLibrary = new Library();
function loadBooks() {
  if (read_cookie('library') == null) {
    myLibrary.addBooksToLibrary([bookA, bookB, bookC, bookD, bookE, bookF, bookG, bookH]);
    bake_cookie('library', myLibrary);
  } else {
    myLibrary.addBooksToLibrary(read_cookie('library')['books']);
  }
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
  dialog.showModal();
});

// COOKIE HANDLER from https://stackoverflow.com/a/11344672/17977603
function bake_cookie(name, value) {
  const cookie = [name, '=', JSON.stringify(value)].join('');
  document.cookie = cookie;
}

function read_cookie(name) {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  return result && (result = JSON.parse(result[1]));
}

function delete_cookie(name) {
  document.cookie = [name, '=;', window.location.host.toString()].join('');
}
