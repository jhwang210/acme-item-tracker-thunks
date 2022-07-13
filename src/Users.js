import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { deleteUser, updateUser, createUser, updateThing } from './store';


const Users = ({ users, createUser, deleteUser, things, removeThingFromUser, incrementUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
                { user.ranking }
                <button onClick={ ()=> deleteUser(user)}>x</button>
                <button onClick={ ()=> incrementUser(user, +1)}>+</button>
                <button onClick={ ()=> incrementUser(user, -1)}>-</button>
                <ul>
                {
                  things.filter( thing => thing.userId === user.id)
                    .map(thing => {
                      return (
                        <li key={ thing.id }>
                          { thing.name } ({ thing.ranking })
                          <button onClick={ ()=> removeThingFromUser(thing)}>x</button>
                        </li>
                      );
                    }) 
                  
                }
                </ul>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: ()=> {
      dispatch(createUser({ name: Math.random() }));
      // dispatch({ type: 'CREATE_USER', user});
      //hint
      //dispatch(createUser({name: Math.random()}));
    },
    removeThingFromUser: async(thing)=> {
      thing = {...thing, userId: null};
      dispatch(updateThing(thing));
      // const updatedThing = (await axios.put(`/api/things/${thing.id}`, thing)).data
      // dispatch({ type: 'UPDATE_THING', thing: updatedThing});
    },
    deleteUser: (user)=> {
      dispatch(deleteUser(user));
      // await axios.delete(`/api/users/${user.id}`);
      // dispatch({ type: 'DELETE_USER', user});
    },
    incrementUser: (user, dir)=> {
      user = {...user, ranking: user.ranking + dir};
      dispatch(updateUser(user));
      // user = (await axios.put(`/api/users/${user.id}`, user)).data;
      // dispatch({ type: 'UPDATE_USER', user});
    }
  };
}
export default connect(mapStateToProps, mapDispatch)(Users);
