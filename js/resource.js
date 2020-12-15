

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

const resourceFetch = async () => {
  try {
    const url = "https://brightly-api.herokuapp.com/api/v1/resources/grade"
    const res = await makeFetch(url)
    if(res.status === "error") {
      displayAlert("danger", res.error)
      return;
    } else {
      console.log(res.data.resourcess)
      // displayAlert("success", res.message)
      displayData(res.data.resourcess)
    }
  } catch (error) {
    console.log(error)
  }
}

resourceFetch();

let pdf;

const displayData = (resources) => {
  const pdfResources = resources.filter((item) => item.type === "pdf");
  pdf = pdfResources;
  return pdfResources.map(item => displayItem(item));
}
const displayItem = (item) => {
  const container = document.querySelector(".pdf-container");
  const div = document.createElement("div");
  const pdfLink = document.createElement("a")
  const lessonLink = document.createElement("a")
  const img = document.createElement("img")

  pdfLink.href = item.link;
  pdfLink.target = "_blank"
  img.src = "https://res.cloudinary.com/simpu-inc/image/upload/v1608020663/Group_84_twzmcu.svg";
  pdfLink.append(img)
  lessonLink.href = item.lesson ? `/lesson.html?id=${item.lesson._id}`: "";
  lessonLink.innerHTML = item.title;
  // console.log("5fd22fc9e082eb003c975690", item.lesson._id)
  div.append(pdfLink)
  div.append(lessonLink)

  container.append(div);
}
