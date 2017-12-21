import React from 'react';

export default class TodoInput extends React.Component {
  constructor() {
    super()
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.checkAll =this.checkAll.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  keyPress(e) {
    let todoValue = this.state.value;
    if (e.key === 'Enter' && todoValue.length > 0) {
      this.props.addTodo(todoValue);
      this.setState({value: ''});
    }
  }

  removeAll() {
    this.props.removeAll();
  }

  checkAll() {
    this.props.checkAll();
  }

  render() {
    const clearButton = (
      <div className="menu-container list-group-item">
        <input
          className="pull-left"
          type="checkbox"
          checked={this.props.ischeckAll}
          onClick={this.checkAll}
        />
        <button className="clear-all btn btn-success pull-right" onClick={this.removeAll}>
          Clear All
        </button>
        <div className="clear"></div>
      </div>
    )
    return (
      <div className="App">
        <div className="input-container">
          <div className="list-group-item">
            <input
              className="form-control input-lg"
              type="text"
              placeholder="What needs to be done?"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.keyPress}
            />
          </div>
          { this.props.hasTodos ? clearButton : null}
        </div>
      </div>
    );
  }
}
