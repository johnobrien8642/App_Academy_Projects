import * as TodoAPIUtil from '../util/todo_api_util.js'
import { receiveErrors, clearErrors } from './error_actions.js';

export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const receiveTodos = todos => {
return {
    type: RECEIVE_TODOS,
    todos,
  };
};

export const receiveTodo = todo => {
  return {
    type: RECEIVE_TODO,
    todo,
  }
}

export const deleteTodo = todo => {
  return {
    type: DELETE_TODO,
    todo,
  }
}

export const fetchTodos = () => dispatch => (
  TodoAPIUtil.fetchTodos().then(todos => dispatch(receiveTodos(todos)))
)

export const createTodo = todo => dispatch => (
  TodoAPIUtil.createTodo(todo)
    .then(todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors()) },
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateTodo = todo => dispatch => (
  TodoAPIUtil.updateTodo(todo)
    .then(todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors())},
      err => dispatch(receiveErrors(err.responseJSON)))
)

export const removeTodo = todo => dispatch => (
  TodoAPIUtil.deleteTodo(todo).then(todo => dispatch(deleteTodo(todo)))
)

// export const createTodo = todo => {
//   return dispatch => {
//     return TodoAPIUtil.createTodo(todo)
//       .then(
//         todo => { dispatch(receiveTodo(todo)); dispatch(clearErrors())},
//         err => dispatch(receiveErrors(err.responseJSON))
//       )
//   }
// }

// export const createTodo = () => todo => dispatch => (
//   TodoAPIUtil.createTodo(todo).then(todo => dispatch(receiveTodo(todo)),
//     err => dispatch(receiveErrors(err.responseJSON))
//   )
// )