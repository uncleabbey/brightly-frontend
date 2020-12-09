let dateElement = document.getElementById("date");
let anotherDateElement = document.getElementById("date2");


let options = {weekday: "short", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
anotherDateElement.innerHTML= today.toLocaleDateString("en-US", options);


