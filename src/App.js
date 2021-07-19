import React from 'react';
import {Link, Route} from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList';
import UserPosts from './components/UserPosts'
import PostsList from './components/PostsList';
import ShowPost from './components/ShowPost';

import './App.css';


const App = (props) => {

  return (
    <div>
      <Link to='/'>Home</Link> | <Link to='/users'>Users</Link> | <Link to='/posts'>Posts</Link>


    <Route path='/' component={Home} exact={true}/>
    <Route path='/users' component={UsersList} exact={true}/>
    <Route path='/users/:id' component={UserPosts} />
    <Route path='/posts' component={PostsList} exact={true}/>
    <Route path='/posts/:id' component={ShowPost} exact={true}/>


    </div>
  )
}

export default App;
