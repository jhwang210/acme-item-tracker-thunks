import React from 'react';
import { connect } from 'react-redux';

const Home = ({ users, things, topRanked, userTopRanked })=> {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Here at the Acme Item Tracker Corp we have { users.length } users and { things.length } things!
      </p>
      <h2>Top User Ranking</h2>
      <ul>
        {
          userTopRanked.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
              </li>
            );
          })
        }
      </ul>
      <h2>Top Thing Ranking</h2>
      <ul>
        {
          topRanked.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
              </li>
            );
          })
        }
      </ul>

    </div>
  );
};

const mapSToP = (s)=> {
  const topRank = Math.max(...s.things.map(thing => thing.ranking));
  const userTopRank = Math.max(...s.users.map(user => user.ranking ));
  const topRanked = s.things.filter(thing => thing.ranking === topRank);
  const userTopRanked = s.users.filter(user => user.ranking === userTopRank);
  return {
    users: s.users,
    things: s.things,
    topRanked,
    userTopRanked
  };
};

export default connect(mapSToP)(Home);
