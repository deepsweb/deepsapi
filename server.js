
//const encode = require("./encode");
const decode = require("./decode");
var lib = require('./passport.js');

module.exports = {
 // encode,
  decode,
};

let bodyParser = require('body-parser');
let app = require('express')();
let port = 3003;

app.use(bodyParser.json());

let todos = [
    {item: "Take out trash", priority: 0},
    {item: "Buy eggs", priority: 1},
    {item: "Clean the house", priority: 2}
]



let output = decode("M1DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025 100");

let result = [
    {name: output.passengerName}
] // DESMARAIS/LUC


app.get('/passport/:raw', (request, response) => {
    console.log(request.params)
    var pdata = lib.parse(request.params.raw);
    //let bcbp = decode(request.params.raw)
    response.send({result:pdata})
})


app.get('/bcbp/:raw', (request, response) => {
    console.log(request.params)
    let bcbp = decode(request.params.raw)
    response.send({result:bcbp})
})

app.post('/parsebcbp', (request, response) => {
    
    console.log(request.body)
    if (request.body && request.body.bcbp !== "") {
        let bcbp = decode(request.body.bcbp)
      
        console.log(bcbp)
        response.send({result: bcbp});
    } else {
        response.status(400).send({message: "Todo item must have a title"})
    }
    
});

app.get('/', (request, response) => response.send({items: todos}))

app.post('/add', (request, response) => {
    if (request.body && request.body.item !== "") {
        todos.push(request.body);
        console.log(todos);
        response.send({items: todos});
    } else {
        response.status(400).send({message: "Todo item must have a title"})
    }
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))