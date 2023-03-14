import headerBar from "./components/headerBar.js";
import cartScreen from "./screen/cartScreen.js";
import Error404Screen from "./screen/Error404Screen.js";
import HomeScreen from "./screen/HomeScreen.js";
import productScreen from "./screen/productScreen.js";
import signInScreen from "./screen/signInScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import registerScreen from "./screen/registerScreen.js";
import profileScreen from "./screen/profileScreen.js";
if(!localStorage.getItem('cart')){
  localStorage.setItem('cart' , []) 
}
const routes = {
  "/" : HomeScreen,
  "/product/:id" : productScreen,
  "/cart": cartScreen,
  "/signin": signInScreen,
  "/register": registerScreen,
  "/profile" : profileScreen

}

const router = async()=>{
  showLoading()
  const url = parseRequestUrl()
  const pathUrl = (url.resource ? `/${url.resource}` : '/') + (url.id ? '/:id' : '') 
  const screen = routes[pathUrl] ? routes[pathUrl]: Error404Screen
  const header = document.getElementById("header");
  header.innerHTML = await headerBar.render() 
  await headerBar.after_render()
  const main = document.getElementById('main-container')
  main.innerHTML = await screen.render()
  await screen.after_render();
  hideLoading()

}
window.addEventListener('load' , router)
window.addEventListener('hashchange' , router)