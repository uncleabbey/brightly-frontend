let dateElement = document.getElementById("date");
let anotherDateElement = document.getElementById("date2");


let options = {weekday: "short", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
anotherDateElement.innerHTML= today.toLocaleDateString("en-US", options);


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
