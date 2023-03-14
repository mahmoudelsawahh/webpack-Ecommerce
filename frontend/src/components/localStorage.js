export const setUserInfo = ({
_id = "",
name = "",
email = "",
password = "",
token = "",
isAdmin = ""
})=>{
localStorage.setItem("userInfo" , JSON.stringify({_id , name , email , password , token , isAdmin}));
}

export const getUserInfo = ()=>{
    return localStorage.getItem("userInfo") ? JSON.parse( localStorage.getItem("userInfo")) : {name : '' , email : '' , password : ''}
}