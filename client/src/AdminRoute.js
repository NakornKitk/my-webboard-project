import {getUser} from './services/authorize'
import {Route,Navigate} from 'react-router-dom'


const AdminRoute=({component:Component,...rest})=>{
    <Route 
        {...rest}
        render={props=>
            getUser() ? (<Component {...props} />) : (<Navigate to = {{pathname:'/login',state:{from:props.location}}}/>)
        }
    />
}

export default AdminRoute;