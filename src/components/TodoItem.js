import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/todoItem.css';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

class TodoItem extends Component {
  render() {
    return (
      <div className="todo-item">
        <p className="category"> {this.props.todo.category}</p>
        <p
          style={{
            textDecoration: this.props.todo.complete ? 'line-through' : 'none',
            color: this.props.todo.complete ? '#cdcdcd' : 'black',
            fontStyle: this.props.todo.complete ? 'italic' : 'normal'
          }}
          onClick={this.props.toggleCompleted}
          className="todo-text"
        >
          {this.props.todo.todoText}
        </p>
        <div className="icon-container">
          <Link to={`/edit-todo/${this.props.todo.id}`}>
            <button className="edit-icon">
              <FaEdit />
            </button>
          </Link>
          <button onClick={this.props.deleteTodo} className="delete-btn">
            X
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleTodo: state.todo.singleTodo
  };
};

export default connect(mapStateToProps, null)(TodoItem);
