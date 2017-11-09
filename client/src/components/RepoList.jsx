import React from 'react';
import RepoListEntry from './repoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>{props.repos.map((repoItem, index) => <RepoListEntry entry={repoItem} key={index}/>)}</div>
  </div>
)

export default RepoList;
