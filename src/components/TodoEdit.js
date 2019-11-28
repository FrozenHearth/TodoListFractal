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
      this.setState({
        todoText: this.props.singleTodo[0].todoText,
        complete: this.props.singleTodo[0].complete,
        id: this.props.singleTodo[0].id
      });
    }
  }

  getSingleTodo = () => {
    this.props.getSingleTodo(this.props.match.params.id);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdateTodo = e => {
    e.preventDefault();
    const todo = {
      todo: this.state.todoText,
      complete: this.state.complete,
      id: this.state.id
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
