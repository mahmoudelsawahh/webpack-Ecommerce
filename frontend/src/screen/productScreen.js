import axios from "axios";
import rating from "../components/rating";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const productScreen = {
    after_render : ()=>{

    },
    render : async ()=>{    
        showLoading()
        const url = parseRequestUrl();
        const itemId = url.id
        const items = await (await axios.get('http://localhost:5000/api/products')).data
        const item = items.filter((ele)=>{
            return ele._id == itemId
        })
        hideLoading()
        return `
         ${item.map((ele)=>{
            return `
            <section>
               
                <div class='container-fluid'>
                 <div class="row">
                    <div class="col-md-4 ms-md-8">
                    <img src="${ele.image}" alt="${ele.name}" width='100%' height:'100%'>
                    </div>


                    <div class="col-md-5 item-body ">
                        <h1>${ele.name}</h1>
                        <h4>Category :  <span>${ele.category}</span></h4>
                        <div class="item-rate">
                        <span>${rating.render({value : ele.rating })}</span>
                        <span class='Reviews'>${ele.numReviews} reviews</span>
                        </div>
                        <h4>Price :  <span>$${ele.price}</span></h4>
                        <h3>Description : <span>${ele.description}</span></h3>
                        </div>


                        <div class="col details">
                        <div class='details-body'>
                        <div class='details-text'>
                        <h4>Price : <span>$${ele.price}</span></h4>
                        <h4>Status : <span>In Stock</span></h4>
                        <button onclick='
                        
                        const cartItem = localStorage.getItem("cart").length > 0 ?  JSON.parse(localStorage.getItem("cart")):   localStorage.getItem("cart")
                        const addToCart = [...cartItem , ${ele._id}]
                          localStorage.setItem("cart" , JSON.stringify(addToCart))
                             window.location.assign("/#/cart/")
                        ' class="btn btn-warning" type="button">Add To Cart</></button>
                        </div>
                        </div>
                        </div>
                    </div>
                 </div>
                </div>
            </section>
            `
         }).join()}
        `
    }
}
export default productScreen;