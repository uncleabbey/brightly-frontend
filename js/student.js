document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName= document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const grade = document.getElementById('grade').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    if(!firstName || !lastName || !grade || !email || !password) {
      displayAlert("danger", "Sorry, Fields cannot be empty");
      return;
    } 
    if (!emailRegex.test(email)) {
      displayAlert("danger", "Email not Valid");
      return;
    }
    const data = {
      email,
      firstName,
      lastName,
      grade,
      password
    };
    const url = 'https://brightly-api.herokuapp.com/api/v1/auth/signup/student';
    // const url = 'http://localhost:3000/api/v1/auth/signup/student';
    const res = await makeFetch(data, url);
    console.log(res);
    if (res.status === 'error') {
      displayAlert('danger', res.error);
    } else {
      localStorage.setItem('token', res.data.token);
      displayAlert('success', res.message);
      location.href = "/dashboard.html"
    }
  });
  
  
