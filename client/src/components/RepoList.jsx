import React from 'react';
import RepoListEntry from './repoListEntry.jsx';

const RepoList = ({repos, number}) => (
  <div>
    <h4> Repo List Component </h4>
    There are {number} repos.
    <div>{repos.map((repoItem, index) => <RepoListEntry entry={repoItem} key={index}/>)}</div>
  </div>
)

export default RepoList;
