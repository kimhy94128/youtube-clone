import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Typography, Button, Form, message, Input, Icon }  from 'antd'
import axios from 'axios'

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

function VideoUploadPage() {
  const [ title, setTitle ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ Private, setPrivate ] = useState(0);
  const [ category, setCategory] = useState('Film & Animation');


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
          console.log(response.data);
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
          <div>
            <img src alt />
          </div>
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
        <Button type="primary" size="large">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
