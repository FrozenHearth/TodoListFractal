import {
  ADD_TODO,
  UPDATE_TODO,
  GET_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_COMPLETED,
  GET_TODO
} from './types';

export const addTodo = todo => {
  return {
    type: ADD_TODO,
    todo
  };
};

export const updateTodo = todo => {
  return {
    type: UPDATE_TODO,
    todo
  };
};

export const toggleCompleteTodo = id => {
  return {
    type: TOGGLE_COMPLETED,
    id
  };
};

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

export const getSingleTodo = id => {
  return {
    type: GET_TODO,
    id
  };
};

export const getAllTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  return {
    type: GET_ALL_TODOS,
    todos
  };
};
