import React from 'react';

const RepoListEntry = ({entry}) => (
  <div className="repo entry">
    <div>
      <h1>{entry.username}</h1>
      <img src={entry.avatarUrl} width="100rem"/>
      <h2>{entry.repoName}</h2>
      <p>{entry.description}</p>
      <a href={entry.repoUrl}>{entry.repoUrl}</a>
    </div>
  </div>
)

export default RepoListEntry;
