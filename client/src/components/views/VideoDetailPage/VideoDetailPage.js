import React, { useState, useEffect } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios'
import SideVideo from './section/SideVideo'
import Subscriber from './section/Subscriber'
import Comment from './section/Comment'
import moment from 'moment'

function VideoDetailPage(props) {
  const [ videoDetail, setVideoDetail ] = useState([])
  const [ comments, setComments ] = useState([])

  const videoId = props.match.params.videoId
  const variable = { videoId }
  useEffect(() => {
    axios.post('/api/video/getVideoDetail', variable)
      .then(response => {
        if(response.data.success){
          setVideoDetail(response.data.videoDetail)
        } else {
          alert('비디오 정보를 가져올 수 없습니다.')
        }
      })

      axios.post('/api/comment/getComments', variable)
      .then(response => {
        if(response.data.success){
          setComments(response.data.comments)
        } else {
          alert('댓글 정보를 가져올 수 없습니다.')
        }
      })
  }, [])

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment))
  }

  if(videoDetail.writer){

    const subscribeButton = videoDetail.writer._id !== localStorage.getItem('userId') && <Subscriber userTo={videoDetail.writer._id} />
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{ width: '100%', padding: '3rem 4rem' }}>
              <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />
              <List.Item
                actions={[subscribeButton]}
              >
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name}
                description={videoDetail.description}
              />

              </List.Item>

              <Comment refreshFunction={refreshFunction} videoId={videoId} commentList={comments} />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
    <div>...loading</div>
    )
  }
}

export default VideoDetailPage
