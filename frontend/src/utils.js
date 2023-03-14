export const parseRequestUrl = () =>{
const url = document.location.hash.toLowerCase();
const request = url.split('/');
return {
    resource: request[1],
    id : request[2],
    action : request[3]
}}

export const showLoading = ()=>{
    document.getElementById("loading").classList.add("active")
}
export const hideLoading = ()=>{
    document.getElementById("loading").classList.remove("active")
}
