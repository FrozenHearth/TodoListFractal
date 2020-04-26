import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  GET_ALL_TODOS,
  TOGGLE_COMPLETED,
  GET_TODO
} from '../actions/types';

const initState = {
  todos: [],
  singleTodo: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      if (action.type === ADD_TODO && action.todo) {
        const todo = action.todo;
        const todos = [...state.todos, todo];
        return { ...state, todos };
      }
      break;
    case UPDATE_TODO:
      if (action.type === UPDATE_TODO && action.todo) {
        const todo = action.todo;
        const updatedTodos = [];
        return { ...state, todos: [...updatedTodos, { ...todo }], todo };
      }
      break;
    case GET_ALL_TODOS:
      if (action.type === GET_ALL_TODOS && action.todos) {
        const allTodos = action.todos;

        return {
          ...state,
          todos: allTodos
        };
      }
      break;
    case DELETE_TODO:
      if (action.type === DELETE_TODO && action.id) {
        const filteredTodos = [
          ...state.todos.filter(todo => todo.id !== action.id)
        ];
        return {
          ...state,
          todos: filteredTodos
        };
      }
      break;
    case TOGGLE_COMPLETED:
      if (action.type === TOGGLE_COMPLETED && action.id) {
        const newTodos = state.todos.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              complete: !todo.complete
            };
          } else {
            return todo;
          }
        });

        return {
          ...state,
          todos: newTodos
        };
      }
      break;
    case GET_TODO:
      if (action.type === GET_TODO && action.id) {
        const singleTodo = [
          ...state.todos.filter(todo => todo.id === action.id)
        ];

        return {
          ...state,
          singleTodo
        };
      }
      break;
    default:
      return state;
  }
};
