//keep tpken
export const authenticate=(response)=>{
    if(window !=="undefined"){
        //เก็บข้อมูลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }
}

//get token
export const getToken=() => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

//get user
export const getUser=() => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}

export const logout=() =>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
}