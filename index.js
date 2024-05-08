class Book {
    constructor(title, author, isbn, price, availability) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.availability = availability;
    }
    applyDiscount(discountPercentage) {
        this.price *= 1 - discountPercentage / 100;
    }
}

class User {
    constructor(name, email, userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
    }
}

class Cart {
    constructor(user) {
        this.user = user;
        this.books = [];
    }

    addBook(book) {
        if (book.availability > 0) {
            this.books = [...this.books, book];
            book.availability--;
            console.log(`${book.title} added to the cart.`);
        } else {
            console.log(`${book.title} is currently out of stock.`);
        }
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
            book.availability++;
            console.log(`${book.title} removed from the cart.`);
        } else {
            console.log(`${book.title} is not in the cart.`);
        }
    }

    calculateTotalPrice() {
        return this.books.reduce((acc, cur) => acc += cur.price, 0);
    }
}

class Order {
    constructor(user, books) {
        this.user = user;
        this.books = books;
        this.totalPrice = this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        return this.books.reduce((acc, cur) => acc += cur.price, 0);
    }
}

class Bookstore {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    searchBooks(query) {
        const results = this.books.filter((book) => {
            return (
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase())
            );
        });
        return results;
    }
}

class Payment {
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

class Database {
    static users = [];
    static books = [];
}


const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 10.99, 5);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 12.49, 3);
book1.applyDiscount(10);
console.log("Discounted price of book1:", book1.price);
const user1 = new User("John Doe", "john@example.com", "123456");

const cart = new Cart(user1);

cart.addBook(book1);
cart.addBook(book2);

cart.removeBook(book1);

console.log("Total price:", cart.calculateTotalPrice());

const order = new Order(user1, cart.books);
console.log("Order placed:", order);

const bookstore = new Bookstore();

bookstore.addBook(book1);
bookstore.addBook(book2);

const searchResults = bookstore.searchBooks("gatsby");
console.log("Search results:", searchResults);

Database.users.push(user1);
Database.books.push(book1, book2);

Payment.processPayment(order.totalPrice)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });