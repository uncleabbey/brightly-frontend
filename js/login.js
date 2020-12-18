  const displayAlert = (type, message) => {
    const container = document.querySelector('.alert-container');
    const h5 = document.createElement('h5');
    h5.className = `text-center alert alert-dismissables alert-${type}`;
    h5.textContent = message;
    container.append(h5);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  };
  

function myFunction() {
    var x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    if(!email || !password) {
      displayAlert("danger", "Sorry, Fields cannot be empty");
      return;
    } 
    if (!emailRegex.test(email)) {
      displayAlert("danger", "Email not Valid");
      return;
    }
    const data = {
      email,
      password,
    };
    const url = 'https://brightly-api.herokuapp.com/api/v1/auth/login';
    // const url = 'http://localhost:3000/api/v1/auth/login';
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

const makeFetch = async (data, url) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return err;
    }
};

// document.querySelector(".input-group").addEventListener("focus", (e) => {
//  console.log(e.target)
// })
