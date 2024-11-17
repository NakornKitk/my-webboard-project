import React, { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { getUser, getToken } from '../services/authorize';
import { useNavigate } from "react-router-dom";


function FormComponent() {
  const navigate = useNavigate();


  const [state, setState] = useState({
    title: "",
    author: getUser()
  })

  const { title, author } = state

  const [content, setContent] = useState('')

  const inputValue = name => event => {
    setState({ ...state, [name]: event.target.value });
  }

  const submitContent = (e) => {
    setContent(e)
  }

  const submitForm = (e) => {
    e.preventDefault();
    // console.table({title,content,author})
    console.log("API URL =", process.env.REACT_APP_API, { title, content, author })
    axios.post(`${process.env.REACT_APP_API}/create`, { title, content, author },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
      .then(response => {
        navigate('/')
        Swal.fire({
          title: "alert",
          text: "Data is already saved",
          icon: "success"
        })
        setState({ ...state, title: '', author: '' });
        setContent('')
          ;
      }).catch(err => {
        Swal.fire({
          title: "alert",
          text: err.response.data.error,
          icon: "error"
        });
      })
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h2 className="mt-3">Creating Form</h2>
      {/* {JSON.stringify(state)} */}
      <form onSubmit={submitForm}>
        <div className="form-group py-1">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
        </div>
        <div className="form-group py-1">
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className=""
            placeholder="adding text"
            style={{ border: '1px solid #666' }}
          />
        </div>
        <div className="form-group py-1">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
        </div>
        <input type="submit" value="submit" className="btn btn-primary mt-2" />
      </form>
    </div>
  )
}

export default FormComponent