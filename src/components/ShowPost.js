import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ShowPost = (props) => {
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    const {id} = props.match.params
    
    useEffect(() => {
        axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                const result = res.data
                setPost(result)
            })
            .catch((err) => {
                alert(err.message)
            })

            
    }, [])

    useEffect(() => {
        if(post.userId > 0 && post.id > 0) {
            const getUser=axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
            const getComments=axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
            axios.all([getUser, getComments])
                .then(axios.spread((...res) => {
                    const result1 = res[0].data
                    setUser(result1)
                    const result2 = res[1].data
                    setComments(result2)
                }))
                .catch((err) => {
                    alert(err.message)
                })
        }
    }, [post])

    return(
        <div>
            <h1>USERNAME - {user.name} </h1>

            <h2>TITLE: {post.title}</h2>
            <h3>BODY : {post.body}</h3><hr/>
            <h3>COMMENTS:</h3>
            <ul>
                {comments.map( (comment) => {
                    return <li key={comment.id}>{comment.body}</li>
                })}
            </ul> <hr/>
            <Link to={`/users/${post.userId}`}>More posts of author: {user.name}</Link>
        </div>
    )
}

export default ShowPost;