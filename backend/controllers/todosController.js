let todos = [];

exports.getTodos = (req, res) => res.json(todos);

exports.addTodo = (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now().toString(), task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).end();
};