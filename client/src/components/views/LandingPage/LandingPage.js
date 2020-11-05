import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Typography, Button, Form, message, Input, Icon, Card, Col, Row, Avatar }  from 'antd'
import axios from 'axios'
import moment from 'moment';

const { Title } = Typography
const { Meta } = Card

function LandingPage() {
  const [ video, setVideo ] = useState([])
  useEffect(() => {
    axios.get('/api/video/getVideos')
      .then(response => {
        if(response.data.success){
          setVideo(response.data.videos);
        } else {
          alert('비디오 가져오기를 실패했습니다.')
        }
      })
  }, [])
    const renderCards = video.map((video, index) => {
      let minutes = Math.floor(video.duration / 60);
      let seconds = Math.floor((video.duration - minutes * 60));
      return (         
        <Col lg={6} md={8} xs={24} key={index}>
          <a href={`/video/${video._id}`}>
            <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} />
            <div style={{ position: 'relative' }}>
              <div className="duration">
                <span>{minutes < 10 ? '0'+ minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
              </div>
            </div>
          </a>
          <br />
          <Meta
            avatar={
              <Avatar src={video.writer.image} />
            }
            title={video.title}
          />
          <span>{video.writer.name}</span> <br/>
          <span style={{ marginLeft: '3rem' }}>조회수 {video.views}회</span> - <span>{moment(video.createdAt).format('MMM Do YY')}</span>
        </Col>
      )
    })
    return (
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> 추천 </Title>
        <hr />
        <Row gutter={[32, 16]}>
          {renderCards}
        </Row>
      </div>
    )
}

export default LandingPage
