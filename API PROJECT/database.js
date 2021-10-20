const books = [
    {
        ISBN: "12345Book",
        title: "tesla!!",
        pubdate: "2021-08-05",
        language: "english",
        numpage: 250,
        author: [1,2],
        publlications: [1],
        category: ["tech","space","education"]
    }
]

const author =[
    {
        id:"1",
        name: "Aradhana",
        books: ["12345Book","secret book"],

    },
    {
        id :"2",
        name: "Elon musk",
        books:["12345Book"],
    }
]

const publication =[
    {
        id:"1",
        name: "writex",
        books: ["12345Book"],

    },
    {
      id:"2",
      name:"writex2",
      books:["Hello "]
    }
]


module.exports = {books,author,publication};
