import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const UserPosts = (props) => {
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] =useState([])
    const {id} = props.match.params
    const getUserData = axios.get( `https://jsonplaceholder.typicode.com/users/${id}`)
    const getUserPosts = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)

    useEffect( () => {
        axios.all([getUserData, getUserPosts])
            .then(axios.spread ((...responses) => {
                const result1 = responses[0].data
                setUser(result1)
                const result2 = responses[1].data
                setUserPosts(result2)
            }))
            .catch( (err) => {
                alert(err.message)
            })
    }, [])

    return (
        <div>
            <h1>User Name - {user.name}</h1><hr/>
            <h2>Post Written By User</h2>
            <ul>
                { userPosts.map ( post => {
                    return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                })}
            </ul>
            <Link to='/users'>Back to Users</Link>
        </div>
    )
}

export default UserPosts