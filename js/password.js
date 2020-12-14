loadData()

const userDetails  = (data) => {
  const avatar = document.querySelector(".avatar");
  const first = document.querySelector(".firstName");
  first.innerHTML = data.firstName;
  avatar.src = data.avatar;
  const name = document.querySelector(".profile-name");
  const profile = document.querySelector(".profile-image");
  name.innerHTML = `${data.firstName} ${data.lastName}`;
  profile.src = data.avatar;
}


const handleChangePassword = async (data, url) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return err;
    }
};


document.getElementById("change-password").addEventListener("submit", (event) => {
  event.preventDefault()
  const old = document.getElementById("old-password").value;
  const password = document.getElementById("new-password").value;
  const password2 = document.getElementById("new-password-2").value;

  if (!old || !password || !password2) {
    displayAlert("danger", "sorry fields can not be empty");
    return
  }
  if(password !== password2) {
    displayAlert("danger", "sorry both passwords have to match");
    return;
  }
  if(password === old) {
    displayAlert("danger", "sorry your old and new password the same");
    return;
  }

const data = {
  password
};
  const changePassword = async () => {
    try {
      const url = "https://brightly-api.herokuapp.com/api/v1/auth/change/password"
      const res = await handleChangePassword(data, url);
      if(res.status === "success") {
            displayAlert("success", res.message)
              document.getElementById("old-password").value = "";
              document.getElementById("new-password").value = "";
              document.getElementById("new-password-2").value = "";
              location.href = "/login.html"
        } else {
          displayAlert("danger", res.error);
          location.href = "/login.html"
        }
    } catch (error) {
      console.log(error)
    }
  }

changePassword()
});



function toggleFunction(id) {
    var input = document.getElementById(id);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

document.getElementById("show-old").addEventListener("click", () => toggleFunction("old-password"))
document.getElementById("show-new").addEventListener("click", () => toggleFunction("new-password"))
document.getElementById("show-new-2").addEventListener("click", () => toggleFunction("new-password-2"))