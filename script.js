let library = [
    
];
let bookIndex = 5;
/*{title: 'The Hobbit', author: 'J.R.R Tolkien', pages: 420, read: 'Not-Read'}*/

const showHideFormBtns = document.querySelectorAll('.show-hide-form');
const formCont = document.querySelector('#form-cont');
const shelf = document.querySelector('#shelf');
const bookBtns = document.querySelectorAll('.book-btns');
const bookForm = document.querySelector('#book-form');
const addedMessage = document.querySelector('#added-message');
const colorMode = document.querySelector('#color-mode');

function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    library.push({title: `${this.title}`, author: `${this.author}`, pages: `${this.pages}`, read: `${this.read}`});

    displayBooks();

}

function processBook(e) {

    e.preventDefault();

    const title = bookForm.querySelector('input[name="title"]').value;
    const author = bookForm.querySelector('input[name="author"]').value;
    const pages = bookForm.querySelector('input[name="pages"]').value;
    const read = bookForm.querySelector('input[name="read-status"]:checked').value;

    if (bookForm.name == 'add-book') {

        new Book(title, author, pages, read);
        bookForm.reset();

    } else if (bookForm.name == 'edit-book') {

        library.splice(bookIndex, bookIndex + 1);
        new Book(title, author, pages, read);

    }

    addedMessage.style.display = 'block';
    setTimeout(() => {
        addedMessage.style.display = 'none';
    }, 1800);
    
}

function displayBooks() {

    shelf.innerHTML = '';

    if (library.length <= 0) {

        return

    } else {

        library.forEach(showBook)

    }

    function showBook(book) {

        const index = library.indexOf(book);

        const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

        const header = document.createElement('div');
            header.classList.add('book-header', 'book-conts');

        const title = document.createElement('h2');
            title.classList.add('book-title');
            title.innerText = `${book.title}`;

        const main = document.createElement('div');
            main.classList.add('book-main', 'book-conts');

        const author = document.createElement('h3');
            author.classList.add('book-author');
            author.innerText = `${book.author}`;

        const length = document.createElement('h3');
            length.classList.add('book-length')
            length.innerText = `${book.pages} Pages`;

        const read = document.createElement('h3');
            read.classList.add('book-read')
            read.innerText = `${book.read}`;

        const footer = document.createElement('div');
            footer.classList.add('book-footer', 'book-conts');

        const edit = document.createElement('button');
            edit.classList.add('book-btns');
            edit.name = 'edit';
            edit.value = `${index}`;
            edit.textContent = 'Edit';

        const remove = document.createElement('button');
            remove.classList.add('book-btns');
            remove.name = 'remove';
            remove.value = `${index}`;
            remove.textContent = 'Remove';

        header.append(title);
        main.append(author, length, read);
        footer.append(edit, remove);
        bookDiv.append(header, main, footer);
        shelf.append(bookDiv);
    }
    
}

displayBooks();

function showHideForm(e) {

    if (e.target.id !== "close-form") {

        formCont.style.display = "grid";

    } else {

        formCont.style.display = "none";

    }
    
}

function changeMode(e) {

    if (e.target.alt == 'Light-Mode') {
        
        e.target.src = './images/dark-mode.png';
        e.target.alt = 'Dark-Mode';

        document.documentElement.style.setProperty('--black', '#fefefe');
        document.documentElement.style.setProperty('--white', '#111111');
        document.documentElement.style.setProperty('--grey', 'rgba(1, 1, 1, 0.07)');
        document.documentElement.style.setProperty('--check', 'url(./images/check.png) no-repeat 50% center');

    } else {

        e.target.src = './images/light-mode_w.png';
        e.target.alt = 'Light-Mode';

        document.documentElement.style.setProperty('--black', '#111111');
        document.documentElement.style.setProperty('--white', '#fefefe');
        document.documentElement.style.setProperty('--grey', 'rgba(256, 256, 256, 0.07)');
        document.documentElement.style.setProperty('--check', 'url(./images/check_w.png) no-repeat 50% center');

    }

}

function nameForm() {

    if (bookForm.name == 'edit-book') {        // Changes text/values for book edit

        bookForm.parentElement.querySelector('h1[class="form-title"]').innerText = 'Edit Book';
        bookForm.querySelector('input[type="submit"]').value = 'Save';
        bookForm.querySelector('input[name="title"]').value = library[bookIndex].title;
        bookForm.querySelector('input[name="author"]').value = library[bookIndex].author;
        bookForm.querySelector('input[name="pages"]').value = library[bookIndex].pages;
        bookForm.querySelector(`[value=${library[bookIndex].read}]`).checked = true;
        addedMessage.innerText = 'Book Updated!';

    } else {        // Resets form for new book

        bookForm.reset();
        bookForm.parentElement.querySelector('h1[class="form-title"]').innerText = 'New Book';
        bookForm.querySelector('input[type="submit"]').value = 'Add Book';
        addedMessage.innerText = 'Successfully Added!';

    }

}

document.addEventListener('click', (e) => {

    if (e.target.name == 'remove') {

        bookIndex = e.target.value;
        library.splice(bookIndex, bookIndex + 1);

        displayBooks();

    } else if (e.target.name == 'edit') {

        bookIndex = e.target.value;
        bookForm.name = 'edit-book';

        nameForm();
        showHideForm(e);

    } else if (e.target.id == 'add-btn' || e.target.id == 'close-form') {

        bookForm.name = 'add-book';

        showHideForm(e);
        nameForm();

    }

});
bookForm.addEventListener('submit', processBook);
colorMode.addEventListener('click', changeMode);