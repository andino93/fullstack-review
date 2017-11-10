import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/repoListEntry.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      number: 0
    }
  }

  setStateFunc ({repos, number}) {
    this.setState({
      repos: repos,
      number: number
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post({
      url: '/repos',
      data: {query: term}
    })
    .done(result => this.setStateFunc(result))
    .fail(err => console.error(err))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} number={this.state.number}/>
    </div>)
  }

  componentDidMount () {
    $.get({
      url: '/repos',
      data: {query: ''}
    })
    .done(result => this.setStateFunc(result))
    .fail(err => console.error(err))
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
