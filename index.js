const express = require('express');
const logger = require('morgan');

const app = express();
const uid = require('uuid');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

let todoList = [];

//todoList
app.get('/task-management', function (req, res) {
  if (todoList.length === 0) {
    res.send({ message: 'No tasks found' });
  } else {
    res.send(todoList);
  }
});

//add to todolist
app.post('/newTask', function (req, res) {
  const newTask = req.body;
  const id = uid.v4();
  todoList.push({
    id,
    task: newTask.task,
    description: newTask.description,
    dueDate: newTask.dueDate,
    status: newTask.status,
  });
  res.send('Task added to TodoList');
});

app.get('/newTask/:id', function (req, res) {
  const newTaskId = req.params.id;
  const newTask = todoList.find((newTask) => newTask.id == newTaskId);

  res.send(newTask);
});

//update
app.put('/newTask/:id', (req, res) => {
  const updateTask = req.body;
  const TaskId = req.params.id;

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == TaskId) {
      todoList[i].task = updateTask.task;
      todoList[i].dueDate = updateTask.dueDate;
      todoList[i].description = updateTask.description;
    }
  }
  res.send('TodoList updated successfully');
});

//update the status of a task by id
app.patch('/newTask/:id', (req, res) => {
  const updateTask = req.body;
  const TaskId = req.params.id;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === TaskId) {
      todoList[i].status = updateTask.status;
      break;
    }
  }
  res.send({ message: 'Task status updated successfully' });
});

app.delete('/newTask/:id', (req, res) => {
  const TaskId = req.params.id;
  todoList = todoList.filter((newTask) => newTask.id != TaskId);
  res.send('Task deleted');
});

app.listen(3001, function () {
  console.log('server is up');
});
