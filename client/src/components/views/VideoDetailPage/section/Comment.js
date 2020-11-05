import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'

function Comment({ videoId, commentList, refreshFunction }) {
  const user = useSelector(state => state.user)
  const [ content, setContent ] = useState('')
  const onChange = (event) => {
    setContent(event.currentTarget.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const variables = {
      content,
      writer: user.userData._id,
      postId: videoId
    }

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success){
          setContent('')
          refreshFunction(response.data.result)
        } else {
          alert('댓글 작성을 실패했습니다.')
        }
      })
  }
  return (
    <div>
      <br />
      <p> 댓글 </p>
      <hr />

      {/* 댓글 */}
      {commentList && commentList.map((comment, index) => (
          (!comment.responseTo && 
            <SingleComment key={index} refreshFunction={refreshFunction} comment={comment} postId={videoId} user={user} />
          )
      ))}
      {/* 루트 댓글 */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={onChange}
          value={content}
          placeholder="댓글을 작성하세요."
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>댓글</button>
      </form>
    </div>
  )
}

export default Comment
