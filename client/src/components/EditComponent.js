import React, { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { getToken } from '../services/authorize';


function EditComponent() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: "",
    author: "",
    slug: ""
  })


  const { title, author, slug } = state

  const [content, setContent] = useState('')

  const submitContent = (e) => {
    setContent(e)
  }

  let params = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then(response => {
        const { title, content, author, slug } = response.data
        setState({ ...state, title, author, slug })
        setContent(content)
      })
      .catch(err => alert(err))
    // eslint-disable-next-line
  }, [])

  const inputValue = name => event => {
    setState({ ...state, [name]: event.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log("API URL =", process.env.REACT_APP_API)
    axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
        navigate('/')
        Swal.fire({
          title: "alert",
          text: "Data is already updated.",
          icon: "success"
        })
        const { title, content, author, slug } = response.data
        setState({ ...state, title, author, slug })
        setContent(content)
      }).catch(err => {
        alert(err)
      })
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h2 className="mt-3">Editing Form</h2>
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
            style={{ border: '1px solid #666' }}
          />
        </div>
        <div className="form-group py-1">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
        </div>
        <input type="submit" value="update" className="btn btn-primary mt-2" />
      </form>
    </div>
  )
}

export default EditComponent