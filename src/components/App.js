import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
};

const onPopState = (handler) => {
  window.onpopstate = handler;
};

class App extends React.Component {
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  state = this.props.initialData;

  componentDidMount(){
    // Ajax fetching, timers, and event listeners goes here
    /*axios.get('/api/contests')
    .then(resp => {
      this.setState({
        contests: resp.data.contests
      });
    })
    .catch(console.error);*/
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }

  componentWillUnmount(){
    // Clean timers and event listeners
  }

  currentContest(){
    return this.state.contests[this.state.currentContestId];
  }

  pageHeader(){
    if (this.state.currentContestId) return this.currentContest().contestName;
    return 'Naming Contests';
  }

  fetchContest = (contestId) => {
    pushState({currentContestId: contestId}, '/contest/' + contestId);
    // Look up the contest
    // this.state.contests[contestId]
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contestId,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
  }

  fetchContestList = () => {
    pushState({currentContestId: null}, '/');
    // Look up the contest
    // this.state.contests[contestId]
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests: contests
      });
    });
  }

  currentContent(){
    if (this.state.currentContestId){
      return <Contest
        contestListClick={this.fetchContestList}
        {...this.currentContest()}
      />
    } else {
      return <ContestList
        onContestClick={this.fetchContest}
        contests={this.state.contests}
      />;
    }
  }

  render(){
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
};

export default App;
