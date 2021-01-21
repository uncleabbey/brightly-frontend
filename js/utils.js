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
            // displayAlert("success", res.message)

            userDetails(res.data.user);
        } else {
          displayAlert("danger", res.error);
          location.href = "/login.html"
        } 
        
    } catch (error) {
        console.log(error)
    }
}

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

}

const notificationsData = [
  {
    message: "Your Science test has been graded",
    time: "1 hour ago"
  },
  {
    message: "New video on dipthong graded",
    time: "1 hour ago"
  },
  {
    message: "Your Task test has been graded",
    time: "1 hour ago"
  },
  {
    message: "Your Task test has been graded",
    time: "1 hour ago"
  },
  {
    message: "Your Task test has been graded",
    time: "1 hour ago"
  },
]

const displayNotiToUI = (data) => {
  const li = document.createElement("li");
  li.className = "notification"
  const img = document.createElement("img")
  img.src = "https://res.cloudinary.com/kayode/image/upload/v1607922152/Vector_y26jlw.svg";
  const div = document.createElement("div")
  const p = document.createElement("p")
  const span = document.createElement("span")

  p.innerHTML = data.message;
  span.innerHTML = data.time;
  div.append(p)
  div.append(span)
  li.append(img)
  li.append(div)
  notificationsList.append(li);
}
const notificationsList  = document.querySelector(".notification-list");
const loadNotification = () => notificationsData.map((item) => displayNotiToUI(item))

loadNotification();


const noteCont = document.querySelector(".notification-cont")

document.getElementById("notification-btn").addEventListener("click", (e) => {
  if(noteCont.style.display === 'none') {
    noteCont.style.display = 'block';
} else if(noteCont.style.display === 'block') {
  // header.classList.remove('header')
  noteCont.style.display = 'none'
} else {
  // header.classList.add('header')
  noteCont.style.display = 'block'
}
})

const profileCont = document.querySelector(".profile-cont");
document.getElementById("profile-btn").addEventListener("click", (e) => {
  if(profileCont.style.display === 'none') {
    profileCont.style.display = 'block';
} else if(profileCont.style.display === 'block') {
  // header.classList.remove('header')
  profileCont.style.display = 'none'
} else {
  // header.classList.add('header')
  profileCont.style.display = 'block'
}
})


// signout

const signout = document.getElementById("signout");

signout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  displayAlert("success", "Successfully signed out");
  location.href = "/"
})