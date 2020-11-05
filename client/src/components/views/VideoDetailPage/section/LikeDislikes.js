import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import axios from 'axios'

function LikeDislikes({ video, videoId, userId, commentId }) {
  const [ likes, setLikes ] = useState(0)
  const [ dislikes, setDislikes ] = useState(0)
  const [ likeAction, setLikeAction ] = useState(null)
  const [ dislikeAction, setDislikeAction ] = useState(null)
  let variable = { }

  if(video){
    variable = { videoId, userId }
  } else {
    variable = { commentId, userId}
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variable)
      .then(response => {
        if(response.data.success){
          setLikes(response.data.likes.length)
          response.data.likes.map(like => {
            if(like.userId === userId){
              setLikeAction('liked')
            }
          })
        } else {
          alert('좋아요 정보를 가져오지 못했습니다.')
        }
      })

    axios.post('/api/like/getDislikes', variable)
    .then(response => {
      if(response.data.success){
        setDislikes(response.data.dislikes.length)
        response.data.dislikes.map(dislike => {
          if(dislike.userId === userId){
            setDislikeAction('disliked')
          }
        })
      } else {
        alert('싫어요 정보를 가져오지 못했습니다.')
      }
    })
  })
  const onLike = () => {
    if(likeAction === null){
      axios.post('/api/like/uplike', variable)
        .then(response => {
          if(response.data.success){
            setLikes(likes + 1)
            setLikeAction('liked')
            if(dislikeAction !== null){
              setLikes(likes - 1)
              setDislikeAction(null)
            }
          } else {
            alert('실패');
          }
        })
    } else {
      axios.post('/api/like/unlike', variable)
        .then(response => {
          if(response.data.success){
            setLikes(likes - 1)
            setLikeAction(null)
          } else {
            alert('실패');
          }
        })
    }
  }
  const onDisLike = () => {
    if(dislikeAction === null){
      axios.post('/api/like/upDislike', variable)
        .then(response => {
          if(response.data.success){
            setDislikes(dislikes + 1)
            setDislikeAction('disliked')
            if(likeAction !== null){
              setLikes(likes - 1)
              setLikeAction(null)
            }
          } else {
            alert('실패');
          }
        })
    } else {
      axios.post('/api/like/unDislike', variable)
        .then(response => {
          if(response.data.success){
            setDislikes(dislikes - 1)
            setDislikeAction(null)
          } else {
            alert('실패');
          }
        })
    }
  }
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like"
            theme={likeAction === 'liked' ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ padding: '0 8px', cursor: 'auto' }}>{likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon type="dislike"
            theme={dislikeAction === 'disliked' ? "filled" : "outlined"}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ padding: '0 8px', cursor: 'auto'}}>{dislikes}</span>
      </span>
    </div>
  )
}

export default LikeDislikes
