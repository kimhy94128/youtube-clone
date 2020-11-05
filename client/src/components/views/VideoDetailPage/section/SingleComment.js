import React, { useState } from 'react'
import { Comment, Avatar } from 'antd'
import axios from 'axios'
import LikeDislikes from './LikeDislikes'

function SingleComment({ postId, user, comment, refreshFunction }) {
  const [ reply, setReply ] = useState(false)
  const [ content, setContent ] = useState('')
  const onClickReply = () => {
    setReply(!reply)
  }
  const actions = [ <LikeDislikes userId={localStorage.getItem('userId')} commentId={comment.commentId} />,
    <span onClick={onClickReply} key="comment-basic-reply-to">답글</span>
  ]
  const onChange = (event) => {
    setContent(event.currentTarget.value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const variables = {
      content,
      writer: user.userData._id,
      postId,
      responseTo: comment._id
    }

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success){
          setContent('')
          setReply(!reply)
          refreshFunction(response.data.result)
        } else {
          alert('댓글 작성을 실패했습니다.')
        }
      })
  } 
  return (
    <div>
      <Comment 
        actions={ actions }
        author={ comment.writer.name }
        avatar={<Avatar src={ comment.writer.image } alt />}
        content={<p>{ comment.content }</p>}
      />

      {reply && 
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onChange}
            value={content}
            placeholder="댓글을 작성하세요."
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>답글</button>
        </form>
      }


    </div>
  )
}

export default SingleComment
