import { signin } from "../components/api";
import { getUserInfo, setUserInfo } from "../components/localStorage";
import { hideLoading, showLoading } from "../utils";

const signInScreen = {
    after_render : ()=>{
      const handelForm = document.getElementById("handelForm");
      handelForm.addEventListener("click" , async(e)=>{
        e.preventDefault();
        showLoading();
        const email = document.getElementById("exampleInputEmail1")
        const password = document.getElementById("exampleInputPassword1")
        const data = await signin({
          email : email.value,
          password : password.value
        });
        hideLoading()
          if(data.error){
            alert(data.error)
          }else{
            setUserInfo(data)
            window.location.reload()
          }
      })
    },
    render : ()=>{
        if(getUserInfo().name){
          document.location.hash = '/'
        }
        return `
            <div class="container">
            <div class="formStyle mt-md-5 mt-4">
                <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <input id="handelForm" type="submit" class="btn btn-warning handelSubmit"/>
                <h5>New User ? <a href="/#/register"> Create Your Account </a></h5>
              </form>

            </div>
            </div>
        `
    }
}
export default signInScreen;