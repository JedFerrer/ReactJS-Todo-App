import React from 'react';

const TodoFooter = (props) => {
  return (
    <footer className="count-info"> 
      <div className="todo-count pull-left">
        <span>
          <b className="total-items">{props.todosLength}</b> items left
        </span>
      </div>
      <button className="clear-completed btn btn-default pull-right" id="clear" onClick={props.clearCompleted}>
        Clear Completed
        <p><span> ({props.completedCount})</span></p>
      </button>
      <div className="clear"></div>
    </footer>
  );
}
export default TodoFooter;
