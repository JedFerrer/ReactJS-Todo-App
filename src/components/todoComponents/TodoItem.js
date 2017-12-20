import React from 'react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      editText: this.props.todo.text
    }
  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  toggleComplete(id) {
    this.props.toggleComplete(id);
  }

  handleEdit() {
    this.props.onEdit();
  }

  handleSubmit() {
    const val = this.state.editText;
    if (val) {
      this.props.onSave(this.props.index, val);
      this.setState({editText: val});
    } else {
      this.removeTodo(this.props.index)
    }
  }

  handleChange(e) {
    if (this.props.editing) {
      this.setState({editText: e.target.value});
    }
  }

  handleKeyDown(e) {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel();
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  }

  //focus the cursor on the text input 
  focusTextInput() {
    const node = this.textInput
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.focusTextInput();
    }
  }

  render() {
    let todoItemLine;
    if (this.props.editing) {
        todoItemLine = (
          <input
            className="form-control"
            type="text"
            value={this.state.editText}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
            ref={(input) => { this.textInput = input; }}
          />
        )
    } else {
      todoItemLine = (
        <div>
          <input className="pull-left" type="checkbox" onClick={() => this.toggleComplete(this.props.index)} />
          <p 
            className={`todo-desc completed-${this.props.todo.completed}`}
            onDoubleClick={this.handleEdit}>
              {this.props.todo.text}
          </p>
          <span className="destroy" onClick={() => this.removeTodo(this.props.index)}></span>
        </div>
      )
    }
    return (
      <div className="todo-content view list-group-item">
        {todoItemLine}
        <div className="clear"></div>
      </div>
    );
  }
}
