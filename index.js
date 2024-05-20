class Book {
    constructor(title, author, isbn, price, availability) {
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this._price = price;
        this._availability = availability;
    }

    applyDiscount(discountPercentage) {
        this._price *= 1 - discountPercentage / 100;
    }

    getInfo() {
        return `${this._title} by ${this._author}`;
    }
}

class PhysicalBook extends Book {
    constructor(title, author, isbn, price, availability, weight) {
        super(title, author, isbn, price, availability);
        this._weight = weight;
    }

    getShippingCost() {
        return this._weight * 0.5; // Example shipping cost calculation
    }
}

class EBook extends Book {
    constructor(title, author, isbn, price, availability, fileSize) {
        super(title, author, isbn, price, availability);
        this._fileSize = fileSize;
    }

    download() {
        console.log(`Downloading ${this._title}...`);
    }
}

/**
 * Represents a User of the bookstore.
 */
class User {
    constructor(name, email, userId) {
        this._name = name;
        this._email = email;
        this._userId = userId;
    }

    getDetails() {
        return `${this._name} (${this._email})`;
    }
}

class Admin extends User {
    constructor(name, email, userId, permissions) {
        super(name, email, userId);
        this._permissions = permissions;
    }

    manageBooks(bookstore) {
        console.log(`Admin ${this._name} is managing books...`);
    }
}

/**
 * Represents a Cart for a user to store books.
 */
class Cart {
    constructor(user) {
        this._user = user;
        this._books = [];
    }

    /**
     * Adds a book to the cart.
     * @param {Book} book - The book to be added.
     */
    addBook(book) {
        if (book._availability > 0) {
            this._books.push(book);
            book._availability--;
            console.log(`${book._title} added to the cart.`);
        } else {
            console.log(`${book._title} is currently out of stock.`);
        }
    }

    /**
     * Removes a book from the cart.
     * @param {Book} book - The book to be removed.
     */
    removeBook(book) {
        const index = this._books.indexOf(book);
        if (index !== -1) {
            this._books.splice(index, 1);
            book._availability++;
            console.log(`${book._title} removed from the cart.`);
        } else {
            console.log(`${book._title} is not in the cart.`);
        }
    }

    /**
     * Calculates the total price of all books in the cart.
     * @returns {number} The total price.
     */
    calculateTotalPrice() {
        return this._books.reduce((acc, cur) => acc + cur._price, 0);
    }
}

/**
 * Represents an Order containing books placed by a user.
 */
class Order {
    constructor(user, books) {
        this._user = user;
        this._books = books;
        this._totalPrice = this.calculateTotalPrice();
    }

    /**
     * Calculates the total price of the order.
     * @returns {number} The total price.
     */
    calculateTotalPrice() {
        return this._books.reduce((acc, cur) => acc + cur._price, 0);
    }
}

/**
 * Represents a Bookstore containing books.
 */
class Bookstore {
    constructor() {
        this._books = [];
    }

    /**
     * Adds a book to the bookstore.
     * @param {Book} book - The book to be added.
     */
    addBook(book) {
        this._books.push(book);
    }

    /**
     * Searches for books based on a query.
     * @param {string} query - The search query.
     * @returns {Book[]} The search results.
     */
    searchBooks(query) {
        const results = this._books.filter((book) => {
            return (
                book._title.toLowerCase().includes(query.toLowerCase()) ||
                book._author.toLowerCase().includes(query.toLowerCase())
            );
        });
        return results;
    }
}

/**
 * Represents a Payment transaction.
 */
class Payment {
    /**
     * Process a payment for the given amount.
     * @param {number} amount - The amount to be paid.
     * @returns {Promise<string>} A promise indicating the result of the payment.
     */
    static processPayment(amount) {
        console.log(`Processing payment of $${amount}...`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.8) {
                    resolve("Payment successful");
                } else {
                    reject("Payment failed");
                }
            }, 2000);
        });
    }
}

/**
 * Represents a database to store users and books.
 */
class Database {
    static _users = [];
    static _books = [];
}

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 10.99, 5);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 12.49, 3);
book1.applyDiscount(10);
console.log("Discounted price of book1:", book1._price);

const user1 = new User("John Doe", "john@example.com", "123456");
const admin1 = new Admin("Jane Smith", "jane@example.com", "admin123", ["ADD_BOOK", "REMOVE_BOOK"]);

const cart = new Cart(user1);
cart.addBook(book1);
cart.addBook(book2);
cart.removeBook(book1);
console.log("Total price:", cart.calculateTotalPrice());

const order = new Order(user1, cart._books);
console.log("Order placed:", order);

const bookstore = new Bookstore();
bookstore.addBook(book1);
bookstore.addBook(book2);

const searchResults = bookstore.searchBooks("gatsby");
console.log("Search results:", searchResults);

Database._users.push(user1);
Database._books.push(book1, book2);

Payment.processPayment(order._totalPrice)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });