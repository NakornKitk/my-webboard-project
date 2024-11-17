import React, {useState, useEffect} from 'react';
import NavbarComponent from "./NavbarComponent"
import axios from 'axios'
import Swal from 'sweetalert2';
import { authenticate} from "../services/authorize";
import {getUser} from '../services/authorize'
import {useNavigate} from "react-router-dom";



const LoginComponent=(props)=>{
    const navigate = useNavigate();

    const [state, setState] = useState({
        username: "",
        password: ""
    })

    const {username, password} = state

    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response => {
            //login successfully
            authenticate(response)
            navigate(`/`)
        }).catch(
            err => {
                Swal.fire({
                    title: "alert",
                    text: err.response.data.error,
                    icon: "error"
                  });
            }
        )
    }

    useEffect(()=>{
        getUser() && navigate(`/`)
        // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
        <NavbarComponent />
        <h2 className="mt-3">Login | admin</h2>
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitForm}>
          <div className="form-group py-1">
              <label>Username</label>
              <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
          </div>
          <div className="form-group py-1">
              <label>password</label>
              <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
          </div>
          <input type="submit" value="Login" className="btn btn-primary mt-2" />
        </form>
    </div>
    )
}

export default LoginComponent