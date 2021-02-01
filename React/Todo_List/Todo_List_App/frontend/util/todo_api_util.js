export const fetchTodos = () => (
  $.ajax({
    url: '/api/todos',
    method: 'GET'
  })
);

export const createTodo = todo => (
  $.ajax({
    url: '/api/todos',
    method: 'POST',
    data: todo
  })
)

export const updateTodo = todo => (
  $.ajax({
    url: `/api/todos/${todo.id}`,
    method: 'PATCH',
    data: { todo }
  })
)

export const deleteTodo = todo => (
  $.ajax({
    url: `/api/todos/${todo.id}`,
    method: 'DELETE'
  })
)