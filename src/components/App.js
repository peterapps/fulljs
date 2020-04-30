import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests'
  };

  componentDidMount(){
    console.log('did mount');
    // Ajax fetching, timers, and event listeners goes here
  }

  componentWillUnmount(){
    console.log('will unmount');
    // Clean timers and event listeners
  }

  render(){
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          ...
        </div>
      </div>
    );
  }
};

export default App;
