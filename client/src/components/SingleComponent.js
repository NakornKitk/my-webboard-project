import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react';
import NavbarComponent from './NavbarComponent'
import parse from 'html-react-parser';

const SingleComponent = () =>{
    const [blog,setBlog] = useState('')
    let params = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent />
            {blog && 
                <div>
                    <h2 className="mt-3">{blog.title}</h2>
                    <p className="py-1">{parse(blog.content)}</p>
                    <p className="text-muted"> Author: {blog.author}, Publish: {new Date(blog.createdAt).toLocaleString()}</p>
                </div>
            }
        </div>
    )
}

export default SingleComponent