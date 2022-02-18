const { News } = require('../models');

const success = '200';
const created = '201';
const serverError = '500';

module.exports = {
  getAllNews(req, res) {
    return News.findAll({
      order: [
        ['createdAt', 'ASC']],
    })
      .then((news) => res.status(success).json(news))
      .catch((e) => res.status(serverError).send(e));
  },
  // addTodo(req, res) {
  //   return Todo.create({ description: req.body.description, checked: req.body.checked })
  //     .then((todos) => res.status(created).send(todos))
  //     .catch((e) => res.status(serverError).send(e));
  // },
  // checkAllTodos(req, res) {
  //   return Todo.update({ checked: req.body.checked }, { where: { checked: !req.body.checked } })
  //     .then((todos) => res.status(success).json(todos))
  //     .catch((e) => res.status(serverError).send(e));
  // },
  // deleteAllTodos(req, res) {
  //   return Todo.destroy({ where: { checked: true } })
  //     .then((todos) => res.status(success).json(todos))
  //     .catch((e) => res.status(serverError).send(e));
  // },
  // checkOneTodo(req, res) {
  //   const { id } = req.params;
  //   const todoChecked = req.body.checked;
  //   return Todo.update({ checked: todoChecked }, { where: { id } })
  //     .then((todos) => res.status(success).json(todos))
  //     .catch((e) => res.status(serverError).send(e));
  // },
  // deleteOneTodo(req, res) {
  //   const { id } = req.params;
  //   return Todo.destroy({ where: { id } })
  //     .then((todos) => res.status(success).json(todos))
  //     .catch((e) => res.status(serverError).send(e));
  // },
};