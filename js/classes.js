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

dayElement.innerHTML = date.toLocaleDateString()


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
    // const span = document.createElement("span")
    const h5 = document.createElement("h4")
    const p = document.createElement("p")
    const title = document.createElement("h5")
    const classLink = document.createElement("div");
    classLink.className = "class-link"
    // a.href = `/class-details.html?id=${item._id}`;

    classLink.innerHTML = `<a href=/lesson.html?id=${item._id}>Start Lesson</a>`
    h5.innerHTML = item.subject;
    // span.innerHTML = `${item.startTime} - ${item.endTime}`

    title.innerHTML = `Title: ${item.lessons[0].title}`;
    p.innerHTML = "Learning Objectives: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, autem?"
    head.append(h5)
    // head.append(span)
    body.append(title)
    flex.append(p)
    flex.append(classLink)
    body.append(flex)
    div.append(head)
    div.append(body)
    container.append(div);
  })
}