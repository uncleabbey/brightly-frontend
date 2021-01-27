// load data and display to ui

loadData()

const userDetails  = (data) => {
  const avatar = document.querySelector(".avatar");
  const first = document.querySelector(".firstName");
  const name = document.querySelector(".profile-name");
  const profile = document.querySelector(".profile-image");
  first.innerHTML = data.firstName;
  avatar.src = data.avatar;
  name.innerHTML = `${data.firstName} ${data.lastName}`;
  profile.src = data.avatar;
}



// add date
const dayElement = document.querySelector(".presentDate");

const date = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
dayElement.innerHTML = `${months[date.getMonth()]} ${date.getDate()}`;


// fetch class data

const fetchClassData = async () => {
  try {
    // const url = "http://localhost:3000/api/v1/class/grade";
    const url = "https://brightly-api.herokuapp.com/api/v1/class/grade";
    const res = await makeFetch(url)
    if(res.status === "success") {
        displayAlert("success", res.message)
        console.log(res.data);
        displayData(res.data.classes);
      } else {
        displayAlert("danger", res.error);
        location.href = "/login.html"
        } 
  } catch (error) {
    console.log(error)
  }
}

fetchClassData()

const timeFormmater = (str) => {
  const time = Number(str);

  if (time <= 12) {
    return `${time.toFixed(2)} AM`
  } else {
    const res = time - 12;
    return `${time.toFixed(2)} PM`
  }
}

const displayData = (data) => {
  const container = document.querySelector(".display-data");
  return data.map((item) => {
    const div = document.createElement("div");
    div.className = "classes";
    const head = document.createElement("div")
    head.className = "classes-head";
    const body = document.createElement("div")
    body.className = "classes-body";
    const flex = document.createElement("div")
    flex.className = "flex";
    const span = document.createElement("span")
    const h5 = document.createElement("h4")
    const p = document.createElement("p")
    const title = document.createElement("h5")
    const classLink = document.createElement("a");
    classLink.className = "class-link"
    // a.href = `/class-details.html?id=${item._id}`;
    classLink.href = `/lesson.html?id=${item.lessons[0]._id}`
    classLink.innerHTML = `<button type=button>Start Lesson</button>`
    h5.innerHTML = item.subject;
    span.innerHTML = `${timeFormmater(item.lessons[0].startTime)} - ${timeFormmater(item.lessons[0].endTime)}`

    title.innerHTML = `Title: ${item.lessons[0].title}`;
    p.className = "objective"
    p.innerHTML = `Learning Objective: ${item.lessons[0].objective}`
    head.append(h5)
    head.append(span)
    body.append(title)
    flex.append(p)
    flex.append(classLink)
    body.append(flex)
    div.append(head)
    div.append(body)
    container.append(div);
  })
}