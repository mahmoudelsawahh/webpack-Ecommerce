import axios from "axios"
import { getUserInfo } from "../components/localStorage";

const cartScreen = {
    after_render : ()=>{
      const addToCart = document.getElementById('checkUser');
      addToCart.onclick = ()=>{
        if(getUserInfo().name){
          document.location.hash('/#/signin')
        }else{
          document.location.hash('/#/profile')

        }
      }
    },
    render : async()=>{  
      const res = await axios.get("http://localhost:5000/api/products")
        const {data} = res
        const id_item = JSON.parse(localStorage.getItem("cart"))

        const getItem =  (i)=>{
            const unique_id = new Set(id_item)
            const myArr = Array.from(unique_id)
            const items = myArr.map((ele)=>{
                  const uniqueData = data.filter((item)=>{
                      return item._id == ele
                  })
                  return uniqueData[0]
            })
         return items
        }
          const totalPrice = ()=>{
            const price = getItem().map((ele)=>{
              return ele.price
            })
            const resultPrice = price.reduce((accumulator, currentValue)=>{
              return accumulator + currentValue
            })
            return resultPrice
          }


        return `
        <div class='container-fluid '>
             <div class="row"> 
                <div class="col-md-9  mt-md-4">     
                    <div class="header-cart">
                        <h2 class="ms-lg-5">Shopping Cart</h2>
                        <h4>Price</h4>
                    </div> 
                    <hr>
                   
                  ${getItem().length > 0 ? 
                    ` ${getItem().map((item)=>{
                      return `
                      <div class="cart-body" id={${item._id}}>
                      <div class="row">
                      <div class="col-9">
                        <div class="row">
                        <div class="col-3 ms-md-3">
                          <img src="${item.image}" class="w-100">
                        </div>
                        <div class="col cart-text">
                          <h2 class="d-xs-none d-md-block">${item.name}</h2>
                          <select class="item-num">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>

                          </select>

                          <button onclick="

                          const id_item = JSON.parse(localStorage.getItem('cart'))
                          
                          const deleteItem = id_item.filter((ele)=>{
                            return ele !== ${item._id}
                          })
                          localStorage.setItem('cart' , JSON.stringify(deleteItem))
                            window.location.reload()

                          ">Delete Item</button>


                        </div>
                        </div>
                      </div>

                      <div class="col-3">
                          <div class="cart-price text-md-end text-center">
                                 <h4> $${item.price}</h4>
                          </div>
                      </div>
                      </div>
                  </div>
                  <hr class="hr-cart">
                      `
                    }).join('')}`
                    : 
                  `
                  <h1 class="text-center pt-5 text-danger">No Item Here </h1>
                  `
                  }
                        


                </div>

                <div class="col-lg-3 col-md-4 details" style="padding : 0px">
                 <div class='details-body'>
                 <div class='details-text'>
                        <h4>Subtotal (${getItem().length} item) : <span>${getItem().length > 0 ?`$${totalPrice()} `: "NAN"}</span></h4>
                        <button ${getItem().length > 0 ? null: 'disabled'}  class="btn btn-warning" id="checkUser" type="button"><a style='color : #000 ' href='/#/cart'>Proceed to Buy</a></button>
                 </div>
                </div>
                </div>
             </div>
        </div>
     `
    }
}
export default cartScreen





