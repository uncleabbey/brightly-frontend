let dateElement = document.getElementById("date");
let anotherDateElement = document.getElementById("date2");


let options = {weekday: "short", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
anotherDateElement.innerHTML= today.toLocaleDateString("en-US", options);

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
    
    try {
        const res = await makeFetch(url)
        console.log(res.data)
        if(res.status === "success") {
            displayAlert("success", res.message)
            const first = document.querySelector(".firstName");
            const { firstName} = res.data.user;
            first.innerHTML = firstName;
        } else {
          displayAlert("danger", res.error);
          location.href = "/login.html"
        } 
        
    } catch (error) {
        console.log(error)
    }
}

// initialize load data
loadData()

const toggleBtn = document.querySelector(".toggler");

const nav = document.querySelector(".sidebar")

toggleBtn.onclick = () => {
  if(nav.style.display === 'none') {
    nav.style.display = 'block';
} else if(nav.style.display === 'block') {
  // header.classList.remove('header')
  nav.style.display = 'none'
} else {
  // header.classList.add('header')
  nav.style.display = 'block'
}

};