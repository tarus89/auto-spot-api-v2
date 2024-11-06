import express from "express";

const app = express();

// app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
function mdl(req, res, next) {
  console.log("made it request is ", req.path);
  next();
}

app.use(mdl);

// todo list
// const todo = [];
const menu = [];
const beve = [];
// app.get("/", (req, res) => {
//   res.json("Here");
// });

//start
app.get("/geek", (req, res) => {
  res.json("am new here");
});
app.get("/geek/:numA/:numB", (req, res) => {
  const numA = parseInt(req.params.numA);
  const numB = parseInt(req.params.numB);
  const result = numA + numB;

  console.log(numA);
  console.log(numB);
  console.log(result);
  res.json("result:" + result);
});

app.get("/menu", (req, res) => {
  //extract query type
  const type = req.query.type;
  let x = [];

  if (type == "food") {
    x = menu;
  } else if (type == "beve") {
    x = beve;
  } else {
    res.status(404).json("Item not found");
  }

  //ternary operator
  x = type == "food" ? menu : beve;

  console.log(type);

  res.json(x);
});

app.post("/menu", (req, res) => {
  const food = req.body.menu;
  const drink = req.body.beve;

  // update list
  menu.push({ food });
  beve.push({ drink });

  console.log(menu);
  console.log(drink);
  res.json("menu:added");
});

//params
app.get("/menu/:type", (req, res) => {
  const type = req.params.type;
  let y = [];
  if (type == "food") {
    y = menu;
  } else if (type == "beve") {
    y = beve;
  } else {
    return res.status(404).json({ message: "Item not available" });
  }

  console.log(type);
  return res.json(y);
});

// app.get("/todo", (req, res) => {
//   res.json({ todoList: todo });
// });

// app.post("/todo", (req, res) => {
//   console.log(req.body);
//   const task = req.body.task;
//   todo.push(task);

//   console.log("Task: ", task);
//   console.log("Todo List: ", todo);
//   res.json("respose received");
// });

// app.listen(8080,'localhost', ()=>{
//     console.log('Server Started')
// })

export const server = app;
