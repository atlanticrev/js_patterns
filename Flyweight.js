// Prior to optimization
// class Book {
//
//     constructor (id,
//                  title,
//                  author,
//                  genre,
//                  pageCount,
//                  publisherID,
//                  ISBN,
//                  checkoutDate,
//                  checkoutMember,
//                  dueReturnDate,
//                  availability
//     ) {
//         this.id = id;
//         this.title = title;
//         this.author = author;
//         this.genre = genre;
//         this.pageCount = pageCount;
//         this.publisherID = publisherID;
//         this.ISBN = ISBN;
//         this.checkoutDate = checkoutDate;
//         this.checkoutMember = checkoutMember;
//         this.dueReturnDate = dueReturnDate;
//         this.availability = availability;
//     }
//
//     getTitle () {
//         return this.title;
//     }
//
//     getAuthor () {
//         return this.author;
//     }
//
//     getISBN () {
//         return this.ISBN;
//     }
//
//     updateCheckoutStatus (bookID, newStatus, checkoutDate,checkoutMember, newReturnDate) {
//         this.id = bookID;
//         this.availability = newStatus;
//         this.checkoutDate = checkoutDate;
//         this.checkoutMember = checkoutMember;
//         this.dueReturnDate = newReturnDate;
//     }
//
//     extendCheckoutPeriod (bookID, newReturnDate) {
//         this.id = bookID;
//         this.dueReturnDate = newReturnDate;
//     }
//
//     isPastDue (bookID) {
//         const currentDate = new Date();
//         return currentDate.getTime() > Date.parse(this.dueReturnDate);
//     }
//
// }

// flyweight optimized version
class Book {

    constructor (title, author, genre, pageCount, publisherID, ISBN) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pageCount = pageCount;
        this.publisherID = publisherID;
        this.ISBN = ISBN;
    }

}

class BookFactory {

    static createBook (title, author, genre, pageCount, publisherID, ISBN) {
        // Find out if a particular book meta-data combination has been created before
        const existingBook = BookFactory.existingBooks[ISBN];
        if (existingBook) {
            return existingBook;
        } else {
            // if not, let's create a new instance of it and store it
            const book = new Book(title, author, genre, pageCount, publisherID, ISBN);
            BookFactory.existingBooks[ISBN] = book;
            return book;
        }
    }

}

BookFactory.existingBooks = {};

class BookRecordManager {

    constructor () {
        this.bookRecordDatabase = {};
    }

    // add a new book into the library system
    addBookRecord (id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
        const book = BookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
        this.bookRecordDatabase[id] = {
            checkoutMember: checkoutMember,
            checkoutDate:   checkoutDate,
            dueReturnDate:  dueReturnDate,
            availability:   availability,
            book:           book
        }
    }

    updateCheckoutStatus (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
        const record = this.bookRecordDatabase[bookID];
        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
    }

    extendCheckoutPeriod (bookID, newReturnDate) {
        this.bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
    }

    isPastDue (bookID) {
        const currentDate = new Date();
        return currentDate.getTime() > Date.parse(this.bookRecordDatabase[bookID].dueReturnDate);
    }

}

// Example 1: Centralized event handling
const template = `
    <div id="container">
        <div class="toggle" href="#">
        More Info (Address)
            <span class="info">This is more information</span>
        </div>
        <div class="toggle" href="#">
        Even More Info (Map)
        <span class="info">
            <iframe src="http://www.map-generator.net/extmap.php?name=London&amp;address=london%2C%20england">
        </span>
        </div>
    </div>
`;

const stateManager = {
    fly: function () {
        const self = this;
        document.querySelector("#container").addEventListener("click", (e) => {
            const target = this.querySelector('div.toogle');
            if (e.target === target) {
                self.handleClick(e.target);
            }
        });
    },

    handleClick: function (el) {
        el.querySelector("span").classList.toggle("slow");
    }
};