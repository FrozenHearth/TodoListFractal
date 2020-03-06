import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/todoItem.css';
import { getSingleTodo, updateTodo } from '../actions/todoActions';
import _ from 'lodash';

class TodoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: '',
      complete: false,
      id: ''
    };
  }

  componentDidMount() {
    this.getSingleTodo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleTodo[0] !== this.props.singleTodo[0]) {
      const { id, todoText, complete } = this.props.singleTodo[0];
      this.setState({
        todoText,
        complete,
        id
      });
    }
  }

  getSingleTodo = () => {
    const { id } = this.props.match.params;
    this.props.getSingleTodo(id);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleUpdateTodo = e => {
    e.preventDefault();
    const { todoText, complete, id } = this.state;
    const todo = {
      todo: todoText,
      complete,
      id
    };
    this.props.updateTodo(todo);

    this.props.history.push('/');
  };
  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleUpdateTodo}>
        <input
          style={{ marginTop: '2em' }}
          className="todo-input"
          onChange={this.handleChange}
          name="todoText"
          type="text"
          value={this.state.todoText}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleTodo: state.todo.singleTodo,
    todos: state.todo.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSingleTodo: id => {
      dispatch(getSingleTodo(id));
    },
    updateTodo: todo => {
      dispatch(updateTodo(todo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);
