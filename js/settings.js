// load data on page
loadData()


const userDetails = (data) => {
  
  const first = document.querySelector(".firstName");
  // const { firstName } = data;
  const email = document.getElementById("email");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const password = document.getElementById("password");
  const avatar = document.querySelector(".avatar");
  const image = document.querySelector(".profile-pix");
  first.innerHTML = data.firstName;
  
  email.value = data.email;
  firstName.value = data.firstName;
  lastName.value = data.lastName;
  password.value = "gdggdgsss";
  image.src = data.avatar;
  avatar.src = data.avatar;
  const name = document.querySelector(".profile-name");
  const profile = document.querySelector(".profile-image");
  name.innerHTML = `${data.firstName} ${data.lastName}`;
  profile.src = data.avatar;
}



document.getElementById("file").addEventListener("change", (e) => handleUpload(e));

const handleUpload = (event) => {
  const files = event.target.files;
  const formData = new FormData()
  formData.append('file', files[0])
  const url = "https://brightly-api.herokuapp.com/api/v1/auth/change/avatar"
  // const url = "http://localhost:3000/api/v1/auth/change/avatar"
  const token = localStorage.getItem("token");
  fetch(url, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      }).then(response => response.json())
  .then(data => {
    console.log(data)
      if(data.status === "success") {
            displayAlert("success", data.message)
            userDetails(data.data.user);
        } else {
          displayAlert("danger", res.error);
          // location.href = "/login.html"
        } 
  })
  .catch(error => {
    console.error(error)
  });
}

