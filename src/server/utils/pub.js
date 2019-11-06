var window = this;

const ePub = require("epubjs");
const path = require("path");

let book = new ePub.Book("../assets/flipped.epub", {});
let navigation = null;

// book.read.then(() => {
//   navigation = new book.navigation();
// });

// navigation.toc.map(item => {
//   console.log(item.label);
// });
