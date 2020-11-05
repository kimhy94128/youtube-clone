import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ commentList , parentCommentId, videoId, refreshFunction }) {
  const [ childComment, setChildComment ] = useState(0);
  const [ openReply, setOpenReply ] = useState(false);
  useEffect(() => {
    let commetNumber = 0
    commentList.map((comment) => {
      if(comment.responseTo === parentCommentId){
        commetNumber ++
      }
    })
    setChildComment(commetNumber)    
  }, [commentList])
  const renderReplyComment = (parentId) => {
    commentList.map((comment, index) => (
      <div key={index}>
        {
          comment.responseTo === parentId && 
          <>
            <SingleComment refreshFunction={refreshFunction} comment={comment} postId={videoId} />
            <ReplyComment commentList={commentList} postId={videoId} parentCommentId={comment._id} />
          </>
        }
      </div>
    ))
  }
  const onClick = () => {
    setOpenReply(!openReply)
  }
  return (
    <div>
      {childComment > 0 && 
        <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor: 'pointer'}} onClick={onClick}>
          답글 {childComment}개 {openReply ? '숨기기' : '보기'}
        </p>
      }
      {openReply && 
        commentList.map((comment, index) => (
          <div>
            {
              comment.responseTo === parentCommentId && 
              <div style={{ width: '80%', marginLeft: '40px'}}>
                <SingleComment refreshFunction={refreshFunction} comment={comment} postId={videoId} />
                <ReplyComment commentList={commentList} postId={videoId} parentCommentId={comment._id} />
              </div>
            }
          </div>
        ))
      }
    </div>
  )
}

export default ReplyComment
