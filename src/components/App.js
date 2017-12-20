import React, { Component } from 'react';
import Header from './Header';
import TodoIndex from './todoComponents/TodoIndex';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="todo-container">
          <div className="container information">
            <div className="row">
              <div className="todoapp col-md-offset-3 col-md-6">
                <TodoIndex />
                <Footer />
              </div>
            </div>      
          </div>
        </div>
      </div>
    );
  }
}
export default App;
