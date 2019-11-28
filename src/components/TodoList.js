import React from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import {
  deleteTodo,
  toggleCompleteTodo,
  getAllTodos
} from '../actions/todoActions';
import '../styles/todoList.css';
import _ from 'lodash';

class TodoList extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
    activeTodo: 'allButton',
    openModal: false
  };

  componentDidMount() {
    if (localStorage.getItem('todos') !== null) {
      this.props.getAllTodos();
    }
  }

  componentDidUpdate(props) {
    localStorage.setItem('todos', JSON.stringify(this.props.todos));
  }

  toggleCompleted = id => {
    this.props.toggleCompleteTodo(id);
  };

  updateTodoToShow = (todo, activeTodo) => {
    this.setState({
      todosToShow: todo,
      activeTodo: activeTodo
    });
  };

  deleteTodo = id => {
    this.props.deleteTodo(id);
    toastr.success('Success', 'Deleted Todo Successfully');
  };
  render() {
    let todoList = this.props.todos;
    if (
      this.state.todosToShow === 'all' &&
      this.state.activeTodo === 'allButton'
    ) {
      todoList = this.props.todos;
    } else if (
      this.state.todosToShow === 'active' &&
      this.state.activeTodo === 'activeButton'
    ) {
      todoList = this.props.todos.filter(todo => !todo.complete);
    } else if (
      this.state.todosToShow === 'complete' &&
      this.state.activeTodo === 'completeButton'
    ) {
      todoList = this.props.todos.filter(todo => todo.complete);
    }
    return (
      <div>
        <h1 className="header-text">todos</h1>
        <TodoInput />
        {this.props.todos && this.props.todos.length > 0 ? (
          <div className="todo-list">
            {todoList.map(todo => (
              <TodoItem
                key={todo.id}
                toggleCompleted={() => this.toggleCompleted(todo.id)}
                deleteTodo={() => this.deleteTodo(todo.id)}
                todo={todo}
              />
            ))}
            <footer className="footer-container">
              <p className="todos-count">
                {this.props.todos.filter(todo => !todo.complete).length} items
                left
              </p>
              <div className="filters">
                <button
                  style={{
                    borderColor:
                      this.state.activeTodo === 'allButton' ? '#96373778' : null
                  }}
                  className="all-btn"
                  onClick={() => this.updateTodoToShow('all', 'allButton')}
                >
                  All
                </button>
                <button
                  style={{
                    borderColor:
                      this.state.activeTodo === 'activeButton'
                        ? '#96373778'
                        : null
                  }}
                  className="active-btn"
                  onClick={() =>
                    this.updateTodoToShow('active', 'activeButton')
                  }
                >
                  Active
                </button>
                <button
                  style={{
                    borderColor:
                      this.state.activeTodo === 'completeButton'
                        ? '#96373778'
                        : null
                  }}
                  className="complete-btn"
                  onClick={() =>
                    this.updateTodoToShow('complete', 'completeButton')
                  }
                >
                  Completed
                </button>
              </div>
            </footer>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todo.todos || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => {
      dispatch(deleteTodo(id));
    },
    toggleCompleteTodo: id => {
      dispatch(toggleCompleteTodo(id));
    },
    getAllTodos: () => {
      dispatch(getAllTodos());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
