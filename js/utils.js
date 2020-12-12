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

const makeFetch = async (url) => {
    const token = localStorage.getItem("token");
    // console.log(token)
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return err;
    }
};


const loadData = async () => {
    const url = "https://brightly-api.herokuapp.com/api/v1/auth/me";
    // const url = "http://localhost:3000/api/v1/auth/me";
    
    try {
        const res = await makeFetch(url)
        console.log(res.data)
        if(res.status === "success") {
            displayAlert("success", res.message)

            userDetails(res.data.user);
        } else {
          displayAlert("danger", res.error);
          location.href = "/login.html"
        } 
        
    } catch (error) {
        console.log(error)
    }
}

