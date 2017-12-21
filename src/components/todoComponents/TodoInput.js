import React from 'react';

export default class TodoInput extends React.Component {
  constructor() {
    super()
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleCheckAll =this.handleCheckAll.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyPress(e) {
    let todoValue = this.state.value;
    if (e.key === 'Enter' && todoValue.length > 0) {
      this.props.addTodo(todoValue);
      this.setState({value: ''});
    }
  }

  handleRemoveAll() {
    this.props.removeAll();
  }

  handleCheckAll() {
    this.props.checkAll();
  }

  render() {
    const inputBottomPanel = (
      <div className="menu-container list-group-item">
        <input
          className="pull-left"
          type="checkbox"
          checked={this.props.ischeckAll}
          onClick={this.handleCheckAll}
        />
        <button className="clear-all btn btn-success pull-right" onClick={this.handleRemoveAll}>
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
              onKeyDown={this.handleKeyPress}
            />
          </div>
          { this.props.hasTodos ? inputBottomPanel : null}
        </div>
      </div>
    );
  }
}
