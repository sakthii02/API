const express = require("express");
//database
const database =require("./database");
//initialise express
var bodyparser = require("body-parser");
//body pareser
require("dotenv").config();
const booky = express();

booky.use(bodyparser.urlencoded({extended: true}));

booky.use(bodyparser.json());

/*
route
ddscription get all the books
access      PUBLIC
parameter   NONE
methods     GET
*/
booky.get("/",(req,res)=> {
    return res.json({books:database.books});
});
/*
route        is
ddscription get specific book isbn
access      PUBLIC
parameter   ISBN
methods     GET
*/
booky.get("/is/:isbn",(req,res) => {
    const getspecificBook= database.books.filter(
        (book)  => book.ISBN === req.params.isbn
    )

    if(getspecificBook.length === 0){
    return res.json({error:`no book found for the ISBN of ${req.params.isbn}`})
}

    return res.json({book:getspecificBook});

});
/*
route        /c
ddscription get specific book category
access      PUBLIC
parameter   category
methods     GET
*/

booky.get("/c/:category",(req,res) =>{
    const getspecificBook= database.books.filter(
        (book)  => book.category.includes(req.params.category)
    )

    if(getspecificBook.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.category}`})
    }

        return res.json({Book:getspecificBook});


} );

/*
route        /a
ddscription get specific book language
access      PUBLIC
parameter   language
methods     GET
*/

booky.get("/a/:language",(req,res) =>{
    const getspecificBook= database.books.filter(
        (book)  => book.language.includes(req.params.language)
    )

    if(getspecificBook.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.language}`})
    }

        return res.json({Book:getspecificBook});


} );

/*
route        /author
ddscription get all the authors
access      PUBLIC
parameter   none
methods     GET
*/

booky.get("/author",(req,res) =>{
    return res.json({authors:database.author})
});


/*
route        /author
ddscription get specific authors based on book
access      PUBLIC
parameter   none
methods     GET
*/
booky.get("/author/book/:isbn",(req,res) =>{
    const getspecificauthor= database.author.filter(
        (author)  => author.books.includes(req.params.isbn)
    )

    if(getspecificauthor.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.isbn}`})
    }

        return res.json({Book:getspecificauthor});


} );


/*
route        /author
ddscription get specific authors based on id
access      PUBLIC
parameter   none
methods     GET
*/

booky.get("/author/:id",(req,res) =>{
    const getspecificauthor= database.author.filter(
        (author)  => author.id === req.params.id
    )

    if(getspecificauthor.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.id}`})
    }

        return res.json({author:getspecificauthor});


} );



/*
route        /publications
ddscription get all the publications
access      PUBLIC
parameter   none
methods     GET
*/

booky.get("/publications",(req,res) =>{
    return res.json({publications:database.publication})
});


/*
route        /publications
ddscription get publications based on id
access      PUBLIC
parameter   none
methods     GET
*/


booky.get("/publications/:id",(req,res) =>{
    const getspecificpublications= database.publication.filter(
        (publication)  => publication.id === req.params.id
    )

    if(getspecificpublications.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.id}`})
    }

        return res.json({Book:getspecificpublications});


} );


/*
route        /publications
ddscription get publications based on books
access      PUBLIC
parameter   none
methods     GET
*/


booky.get("/publications/book/:isbn",(req,res) =>{
    const getspecificpublication= database.publication.filter(
        (publication)  => publication.books.includes(req.params.isbn)
    )

    if(getspecificpublication.length === 0){
        return res.json({error:`no book found for the cateroy of ${req.params.isbn}`})
    }

        return res.json({Book:getspecificpublication});


} );


/*
route        /book
ddscription add new book
access      PUBLIC
parameter   none
methods     POST
*/

booky.post("/book/new",(req,res) =>{
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks:database.books});
});


/*
route        /author/new
ddscription add new authors
access      PUBLIC
parameter   ISBN
methods     post
*/

booky.post("/author/new",(req,res) =>{
  const newAuthor =req.body;
  database.author.push(newAuthor);
  return res.json(database.author);

});


/*
route        /publication/new
ddscription add new publication
access      PUBLIC
parameter   ISBN
methods     post
*/

booky.post("/publication/new",(req,res) =>{
  const newPublication =req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);

});


/*
route        /publication/update/book
ddscription update/add new publication
access      PUBLIC
parameter   ISBN
methods     put
*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
//update publication data base
database.publication.forEach((pub) =>{
  if(pub.id === req.body.pubId){
    return pub.books.push(req.params.isbn);
  }
});

//update the book data based
database.books.forEach((book) =>{
  if(book.ISBN === req.params.isbn){
    book.publications =req.body.pubId;
    return;
  }

});
return res.json({
  books:database.books,
  publications:database.publication,
  message: "sucessfully updated publications"
}
)
});
/******DELETE***/

/*
route        /book/delete
ddscription  delete a book
access      PUBLIC
parameter   ISBN
methods     DELETE
*/

booky.delete("/book/delete/:isbn/",(req,res) =>{
  //which ever book doesnot match with isbn,just send
  //rest will be filtered out
const updatedBookDatabase = database.book.filter(
  (book) => book.ISBN !== req.params.isbn
)
database.books = updatedBookDatabase;
return res.json({books:database.books});
});


/*
route        /book/delete
ddscription  delete a book
access      PUBLIC
parameter   ISBN
methods     DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{
//update the book database
database.books.forEach((book) =>{
  if(book.ISBN === req.params.isbn){
    const newAuthorList = book.author.filter(
      (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
    );
    book.author = newAuthorList;
    return;
  }
});
//update the author database
database.author.forEach((eachAuthor) =>{
  if(eachAuthor.id === parseInt(req.params.authorId)){
    const newBookList = eachAuthor.books.filter(
      (book) => (book)!== req.params.isbn
    );
    eachauthor.books =newBookList;
    return;
  }
});
return res.json({
  book :database.books,
  author :database.author,
  message :"Author was deleted!!!"
});

});

booky.listen(3000,() => {
    console.log("server is running");
});
