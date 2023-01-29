const todoModel = require("../models/todos");
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    todoModel.findById(req.params.todoId, function (err, todoInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Todo found!!!",
          data: { todos: todoInfo },
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let todosList = [];
    todoModel.find({}, function (err, todos) {
      if (err) {
        next(err);
      } else {
        for (let todo of todos) {
          todosList.push({
            id: todo._id,
            name: todo.name,
            phone_number: todo.phone_number,
            sub_total: todo.sub_total,
          });
        }
        res.json({
          status: "success",
          message: "Todo list found!!!",
          data: { todos: todosList },
        });
      }
    });
  },
  updateById: function (req, res, next) {
    todoModel.findByIdAndUpdate(
      req.params.todoId,
      { name: req.body.name },
      function (err, todoInfo) {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "todo updated successfully!!!",
            data: null,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    todoModel.findByIdAndRemove(req.params.todoId, function (err, todoInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "Todo deleted successfully!!!",
          data: null,
        });
      }
    });
  },
  create: function (req, res, next) {
    todoModel.create(
      {
        name: req.body.name,
        sub_total: req.body.sub_total,
        phone_number: req.body.phone_number,
      },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Todo added successfully!!!",
            data: null,
          });
      }
    );
  },
};
