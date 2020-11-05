import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Subscriber({ userTo }) {
  const [ subscribeNumber, setSubscribeNumber ] = useState(0)
  const [ subscribed, setSubscribed ] = useState(false)
  
  useEffect(() => {
    let variable = userTo
    axios.post('/api/subscribe/subscribeNumber', variable)
      .then(response => {
        if(response.data.success){
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('구독자 정보를 가져올 수 없습니다.')
        }
      })
    let subscribeVariable = { userTo, userFrom: localStorage.getItem('userId') };
    axios.post('/api/subscribe/subscribed', subscribeVariable)
      .then(response => {
        if(response.data.success){
          setSubscribed(response.data.subscribed)
        } else {
          alert('정보를 받아오지 못했습니다.')
        }
      })
  }, [])

  const onClick = () => {
    let subscribeVariable = { userTo, userFrom: localStorage.getItem('userId')}
    if(subscribed){
      axios.post('/api/subscribe/unSubscribe', subscribeVariable)
        .then(response => {
          if(response.data.success){
            setSubscribeNumber(subscribeNumber - 1)
            setSubscribed(!subscribed)
          } else {
            alert('구독 취소 실패')
          }
        })
    } else {
      axios.post('/api/subscribe/subscribe', subscribeVariable)
        .then(response => {
          if(response.data.success){
            setSubscribeNumber(subscribeNumber + 1)
            setSubscribed(!subscribed)
          } else {
            alert('구독 취소 실패')
          }
        })
    }
  }
  return (
    <div>
      <button 
        style={{ 
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
          color: 'white', padding: '10px 16px', border: '0px',
          fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'  
        }}
        onClick={onClick}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscriber
