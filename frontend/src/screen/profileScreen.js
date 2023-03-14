import { getUserInfo } from "../components/localStorage";
import { update } from "../components/api";

const profileScreen = {
    after_render : ()=>{
        const email = document.getElementById("exampleInputEmail1");
      const name = document.getElementById("name");
      const password = document.querySelectorAll('.password');
      const handelSubmit = document.getElementById('handelForm');
      handelSubmit.addEventListener('click' , async()=>{
          const data = await update({
            name : name.value,
            email : email.value,
            password : password[0].value
          })
          if(data.error){
            alert(data.error)
          }else{
            document.location.hash = '/#/signin'
          }
        }
      )
    },
    render : ()=>{
        const userInfo = getUserInfo();
        if(userInfo.name){
            return `
         <div class="container-fluid">
            <div class="mx-4">
                <div class="row">
                <div class="col-md-4">
                <form>
                <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" value="${userInfo.name}" id="name" class="form-control">
            <div id="emailHelp" class="form-text">Please Write Full Name.</div>
          </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" value="${userInfo.email}" id="exampleInputEmail1" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control password" id="exampleInputPassword1">
            </div>
            <input id="handelForm" type="submit" class="btn btn-warning handelSubmit w-100" value="Update"/>

                </form>
            </div>

            <div class="col-md-8  mt-5 mt-md-0">
            <table class="table">
            <thead>
              <tr>
                <th scope="col">ORDER TO</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PAID</th>
                <th scope="col">DELIVERED</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>asd444584asd415c41as854</td>
                <td>2020-6-5</td>
                <td>$55</td>
                <td>True</td>
                <td>False</td>
                <td>Details</td>
              </tr>
              <tr>
              <td>asd444584asd415c41as854</td>
              <td>2020-6-5</td>
              <td>$55</td>
              <td>True</td>
              <td>False</td>
              <td>Details</td>
            </tr><tr>
            <td>asd444584asd415c41as854</td>
            <td>2020-6-5</td>
            <td>$55</td>
            <td>True</td>
            <td>False</td>
            <td>Details</td>
          </tr><tr>
          <td>asd444584asd415c41as854</td>
          <td>2020-6-5</td>
          <td>$55</td>
          <td>True</td>
          <td>False</td>
          <td>Details</td>
        </tr>
            </tbody>
          </table>
            
            </div>
                </div>
            </div>
         </div>
       `
        }else{
            document.location.hash('/')
        }
       
    }
}
export default profileScreen;