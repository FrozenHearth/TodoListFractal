import React from 'react';
import { connect } from 'react-redux';
import '../styles/todoItem.css';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const TodoItem = props => {
  const { id, category, complete, todoText } = props.todo;
  const { toggleCompleted, deleteTodo } = props;
  return (
    <div className="todo-item">
      <p className="category"> {category}</p>
      <p
        className={complete ? 'todo-complete-text todo-text' : 'todo-text'}
        onClick={toggleCompleted}
      >
        {todoText}
      </p>
      <div className="icon-container">
        <Link to={`/edit-todo/${id}`}>
          <button className="edit-icon">
            <FaEdit />
          </button>
        </Link>
        <button onClick={deleteTodo} className="delete-btn">
          X
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { singleTodo } = state.todo
  return {
    singleTodo
  };
};

export default connect(mapStateToProps, null)(TodoItem);
