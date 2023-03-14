import { register } from "../components/api";

const registerScreen = {
    after_render : ()=>{
      const email = document.getElementById("exampleInputEmail1");
      const name = document.getElementById("name");
      const password = document.querySelectorAll('.password');
      const handelSubmit = document.getElementById('handelForm');
      handelSubmit.addEventListener('click' , async()=>{
        if(password[0].value == password[1].value){
          const data = await register({
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
      })

    },
    render : ()=>{
        
        return `
            <div class="container">
            <div class="formStyle mt-md-5 mt-4">
                <form>
                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" id="name" class="form-control">
                <div id="emailHelp" class="form-text">Please Write Full Name.</div>
              </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control password" id="exampleInputPassword1">
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Re-Enter Password</label>
                <input type="password" class="form-control password" id="exampleInputPassword1">
              </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <input id="handelForm" type="submit" class="btn btn-warning handelSubmit"/>
                <h5>Already Have Account ? <a href="/#/signin"> Sign-In </a></h5>
              </form>

            </div>
            </div>
        `
    }
}
export default registerScreen;