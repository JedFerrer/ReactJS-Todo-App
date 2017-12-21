import React from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';

export default class TodoIndex extends React.Component {
  constructor() {
    super()

    let todoListObj = {
      todos: [],
      nextId: 0,
      completedCount: 0,
      itemsLeft: 0,
      editing: null,
      isCheckAll: false
    }

    //Search for Existing Local Storage
    if (typeof(localStorage["todoListCollection"]) !== 'undefined') {
      todoListObj = JSON.parse(localStorage["todoListCollection"]);
    }

    this.state = todoListObj;
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  addTodo(todoText) {
    let todos = this.state.todos.slice();
    let nextId = this.state.nextId;
    todos.push({id: this.state.nextId, text: todoText, completed: false});
    this.setState({
      todos: todos,
      itemsLeft: todos.length,
      nextId: ++nextId,
      editText: null
    }, () => {
      this.saveToLocalStorage();
    });
    this.updateCounters(todos);

  }

  save(id, text) {
    let todos = this.state.todos.slice();
    todos[id].text = text
    this.setState({
      todos: todos,
      editing: null
    }, () => {
      this.saveToLocalStorage();
    });
  }

  removeTodo(id) {
    let todos = this.state.todos.slice();
    todos.splice(id, 1);
    this.setState({
      todos: todos
    }, () => {
      this.saveToLocalStorage();
    });
    this.updateCounters(todos);
  }

  removeAll() {
    this.setState({
      todos: [],
      nextId: 0,
      completedCount: 0,
      itemsLeft: 0,
      editing: null,
      isCheckAll: false
    })
    localStorage.removeItem("todoListCollection");
  }

  checkAll() {
    let todos = this.state.todos.slice();
    const isCheckAll = !this.state.isCheckAll;
    for (let todo of todos) {
      todo.completed = isCheckAll
    }
    this.setState({
      todos: todos
    }, () => {
      this.saveToLocalStorage();
    });
    this.updateCounters(todos);
  }

  updateCounters(todos) {
    let completedCounter = 0;
    for (let todo of todos) {
      if (todo && todo.completed) {
        completedCounter++;
      }
    }
    this.setState({
      completedCount: completedCounter,
      itemsLeft: todos.length - completedCounter,
      isCheckAll: completedCounter === todos.length
    });
    return completedCounter;
  }

  toggleComplete(id) {
    let todos = this.state.todos.slice();
    todos[id].completed = !todos[id].completed

    this.setState({
      todos: todos
    }, () => {
      this.saveToLocalStorage();
    });
    this.updateCounters(todos);
  }

  clearCompleted() {
    if (this.state.completedCount > 0) {
      let todos = this.state.todos.slice();
      todos = todos.filter((todo) => todo.completed === false)
      
      this.setState({
        todos: todos
      }, () => {
        this.saveToLocalStorage();
      });
      this.updateCounters(todos);
    }
  }

  edit(todo) {
    this.setState({editing: todo.id});
  }

  cancel() {
    this.setState({editing: null});
  }

  saveToLocalStorage() {
    localStorage["todoListCollection"] = JSON.stringify(this.state);
  }

  render() {
    const state = this.state;
    const hasTodos = state.todos.length > 0;
    return (
      <div className="App">
        <div className="todo-wrapper">
          <TodoHeader />
          <TodoInput
            addTodo={this.addTodo}
            hasTodos={hasTodos}
            removeAll={this.removeAll}
            ischeckAll={state.isCheckAll}
            checkAll={this.checkAll}
          />
          <ul className="todo-list">
            {
              state.todos.map((todo, index) => {
                return (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    id={todo.id}
                    toggleComplete={this.toggleComplete}
                    removeTodo={this.removeTodo}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onCancel={this.cancel}
                    onSave={this.save}
                  />
                )
              })
            }
          </ul>
          { hasTodos ? <TodoFooter todosLength={state.itemsLeft} completedCount={state.completedCount} clearCompleted={this.clearCompleted} /> : null}
        </div>
      </div>
    );
  }
}
