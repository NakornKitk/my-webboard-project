import NavbarComponent from './components/NavbarComponent'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import parse from 'html-react-parser';
import { getUser,getToken } from './services/authorize'

function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Do you want to delete it?",
      icon: "warning",
      showCancelButton:true
    }).then((result)=>{
      // click ok to confirm
      if(result.isConfirmed){
        // send api to delete
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog = (slug) => {
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
      {
        headers:{
          Authorization:`Bearer ${getToken()}`
        }
      })
    .then(response=>{
      Swal.fire({
        title: "Deleted!",
        text: response.data.message,
        icon: "success"
      })
      fetchData()
    }).catch(err=>console.log(err))
  }


  return (
    <div className="container p-5" >
      <NavbarComponent />
      {blogs.map((blog,index) =>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2 className="">{blog.title}</h2>
            </Link>
            <div className="pt-2">{parse(blog.content.substring(0,250))}</div>
            <p className="text-muted"> author: {blog.author}, publish: {new Date(blog.createdAt).toLocaleString()}</p>
            {
              getUser() && (
                <div className="pb-2">
                  <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>Edit</Link> &nbsp;
                  <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>Delete</button>
                </div>
              )
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
