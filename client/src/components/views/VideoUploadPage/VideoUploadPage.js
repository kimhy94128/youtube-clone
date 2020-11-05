import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Typography, Button, Form, message, Input, Icon }  from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'

const { Title } = Typography;
const { TextArea } = Input;
const PrivateOptions = [
  { value: 0, label: "Private"},
  { value: 1, label: "Public"}
]
const categoryOptions = [
  { value: 0, label: "Film & Animation"},
  { value: 1, label: "Autos & Vehicles"},
  { value: 2, label: "Music"},
  { value: 3, label: "Pets & Animals"},
]

function VideoUploadPage(props) {
  const user = useSelector(state => state.user);
  const [ title, setTitle ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ Private, setPrivate ] = useState(0);
  const [ category, setCategory] = useState('');
  const [ filePath, setFilePath ] = useState('');
  const [ duration, setDuration ] = useState('')
  const [ thumbnailPath, setThumbnailPath ] = useState('')


  const onChange = (event) => {
    const { target: {name, value}} = event;
    if(name === 'title'){
      setTitle(value);
    } else if(name === 'desc'){
      setDesc(value)
    } else if(name === 'Private') {
      setPrivate(value)
    } else if(name === 'category'){
      setCategory(value)
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      writer: user.userData._id,
      title,
      description: desc,
      privacy: Private,
      filePath,
      category,
      duration,
      thumbnail: thumbnailPath,
    }
    axios.post('/api/video/uploadVideo', variables)
      .then(response => {
        if(response.data.success){
          message.success('성공적으로 업로드를 했습니다.')
          setTimeout(()=>{
            props.history.push('/')
          }, 3000);
        } else {
          alert('비디오 업로드에 실패 했습니다.')
        }
      })
  }
  const onDrop = (files) => {
    let formData = new FormData;
    const config = {
      header: { 'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])

    axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if(response.data.success){
          let variable = {
            url: response.data.url,
            fileName: response.data.fileName
          }

          setFilePath(response.data.url);

          axios.post('/api/video/thumbnail', variable)
            .then(response => {
              if(response.data.success){
                setDuration(response.data.fileDuration);
                setThumbnailPath(response.data.url);
              } else {
                alert('썸네일 생성에 실패 했습니다.')
              }
            })
        } else {
          alert('업로드 실패')
        }
      })
  }
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone 
          onDrop={onDrop}
          multiple={false}
          maxSize={100000000}>
          {({getRootProps, getInputProps}) => (
            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
          alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem'}} />
          </div>  
            )}
          </Dropzone>
          { thumbnailPath && 
            <div>
              <img src={`http://localhost:5000/${thumbnailPath}`} alt='thumbnail' />
            </div>
          }
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input value={title} name="title" onChange={onChange} />
        <br />
        <br />
        <label>Description</label>
        <TextArea value={desc} name="desc" onChange={onChange} />
        <br />
        <br />

        <select onChange={onChange} name="Private">
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={onChange} name="category">
          { categoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
