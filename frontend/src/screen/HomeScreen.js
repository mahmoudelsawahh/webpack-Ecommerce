import axios from 'axios';
import rating from '../components/rating';
const HomeScreen = {
    after_render : ()=>{
    },
    render : async()=>{
        const response = await axios.get('http://localhost:5000/api/products')
        if(!response){
          return `<h1>Error In backEnd</h1>`
        }
        const products = await response.data;
        return `
        <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-md-8 col-lg-6">
                <div class="header" >
                    <h2>Popular Products</h2>
                </div>
            </div>
        </div>
        <div class="row">


        ${products.map((item)=>{
            return `
              <div key=${item._id} class="col-md-6 col-lg-4 col-xl-3" id="ss" onclick='window.location.assign("/#/product/${item._id}")'>
                <div id="product-4" class="single-product">
                <div class="part-1" style="background-image: url('${item.image}');">
                <span class="new">${item.category}</span>
                <ul>
                    <li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
                    <li><a href="#"><i class="fas fa-heart"></i></a></li>
                    <li><a href="#"><i class="fas fa-plus"></i></a></li>
                    <li><a href="#"><i class="fas fa-expand"></i></a></li>
                </ul>
            </div>
            <div class="part-2">
            <h2 class="product-title">${item.name}</h2>
            <div class="product-rating">
            ${rating.render({value : item.rating })}
            <span class='reviews'>${item.numReviews} reviews</span>
            </div>
            <div class="cart-footer">
              <h4 class="product-price">$${item.price}</h4>
                <a class="position-relative">
                  <i style="font-size: 25px" class="fa-solid fa-cart-plus"></i>
                    
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </a>
          
            </div>
          </div>
             </div>
                </div>
            ` 
          }).join('\n')
          
          }


        </div>
    </div>

        `
    }
}
export default HomeScreen


