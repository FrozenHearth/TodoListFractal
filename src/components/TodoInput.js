import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { addTodo } from '../actions/todoActions';
import '../styles/todoInput.css';

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoText: '',
      category: '',
      disableAddBtn: true
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleAddTodo = e => {
    e.preventDefault();
    const { todoText, category } = this.state;
    todoText.trim();
    category.trim();
    if (todoText.length > 0 && category.length > 0) {
      const todo = {
        todoText,
        category,
        complete: false,
        id: shortid.generate()
      };
      this.props.addTodo(todo);
      toastr.success('Success', 'Added Todo Successfully');
      this.setState({
        todoText: '',
        category: ''
      });
    }
  };
  render() {
    const { todoText, category } = this.state;
    return (
      <form autoComplete="off">
        <input
          className="todo-input"
          value={todoText}
          onChange={this.handleChange}
          name="todoText"
          type="text"
          placeholder="What needs to be done?"
        />
        <input
          className="todo-bucket-input"
          value={category}
          onChange={this.handleChange}
          name="category"
          type="text"
          placeholder="Add a label/category"
        />
        <button className="add-todo-btn" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => {
      dispatch(addTodo(todo));
    }
  };
};

export default connect(null, mapDispatchToProps)(TodoInput);
