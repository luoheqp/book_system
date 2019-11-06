var window = global;

const ePub = require("epubjs");
const path = require("path");

let book = new ePub.Book("../assets/flipped.epub", {});

console.log(book);
