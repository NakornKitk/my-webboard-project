const jwt = require("jsonwebtoken")
const { expressjwt: JWT } = require("express-jwt");


exports.login = (req,res) => {
    const {username, password} = req.body
    if(password === process.env.PASSWORD){
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
        return res.status(400).json({
            error:"wrong password"
        })
    }
}



exports.requireLogin=JWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})