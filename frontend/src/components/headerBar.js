import axios from "axios";
import { getUserInfo } from "./localStorage";

const headerBar = {
    after_render : async()=>{
      const handelSearch = document.querySelectorAll('.handelSearch');
      const addSearchItem = document.querySelectorAll('.addSearchItem')
      const res = await axios.get('http://localhost:5000/api/products');
      const {data} = res;
    const userInfo = getUserInfo();
    const handelRegister = document.querySelectorAll('.handelRegister');
        handelRegister.forEach((ele)=>{
            if(userInfo.name){
                ele.textContent = "Sign-Out"
                ele.addEventListener('click' , ()=>{
                    localStorage.removeItem("userInfo")
                })
            }else{
                ele.textContent = "Sign-Up"
            }
        })
        // -----------------------  Search Input  ----------------------------

        handelSearch.forEach((item)=>{
          item.oninput = async(e)=>{
            const items = data.filter((ele)=>{
              return ele.category.startsWith(e.target.value)
            })
            
            const result = items.map((ele)=>{
              return `
              <li> <a href="/#/product/${ele._id}"> ${ele.name} </a></li>
              `
            })
              addSearchItem.forEach((ele)=>{
                ele.innerHTML = result.join('')
              })
          }
        })
    },
    render : ()=>{
        const userInfo = getUserInfo();

        return `
        <nav class="navbar navbar-dark bg-dark" id="handelHeader">
        <div class="container-fluid">
                <div class="col d-flex align-items-center">
                    <button class="navbar-toggler"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                  <a class="navbar-brand title-header" style="margin-left: 15px" href="#">amazona</a>
                </div>
                <div class="col d-none d-md-block ">
                    <form role="search">
                        <div class="d-flex">
                        <input style="border-radius: 4px 0px 0px 4px" class="form-control handelSearch" type="search" placeholder="Search Her....." aria-label="Search">
                        <button  class="btn btn-warning iconSearch" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                        <div class="searchItems">
                         <ul class="addSearchItem" >
                         
                         </ul>
                        </div>
                      </form>
                </div>
                <div  class="col text-nav">
                ${userInfo.name ? `<a class="navbar-brand" href="/#/profile">${userInfo.name}</a>` : ''}
                  <a class="navbar-brand " href="/#/cart">Cart</a>
                    <a class="navbar-brand d-none d-sm-block handelRegister" href="/#/signin">Sign-Up</a>
                </div>
          <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title title-header" id="offcanvasDarkNavbarLabel">amazona</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div>
               </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">All Product</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Shirts</a>
                  </li>
                <li class="nav-item">
                  <a class="nav-link" href="/">Pants</a>
                </li>
              </ul>
    
                  <form role="search">
                  <div class="d-flex">
                  <input style="border-radius: 4px 0px 0px 4px" class="form-control handelSearch" type="search" placeholder="Search Her....." aria-label="Search">
                  <button  class="btn btn-warning iconSearch" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                  <div class="searchItems">
                   <ul class="addSearchItem" >
                   
                   </ul>
                  </div>
                </form>

                <div class="d-grid d-sm-none mt-3">
                <a href="/#/signin" class="btn btn-warning handelRegister">Sign-Up</a>
              </div> 
            </div>
          </div>
        </div>
      </nav>
        `
    }
}
export default headerBar;