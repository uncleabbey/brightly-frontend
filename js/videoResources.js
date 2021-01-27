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
    // const url = "http://localhost:3000/api/v1/resources/grade"
    const url = "https://brightly-api.herokuapp.com/api/v1/resources/grade"
    const res = await makeFetch(url)
    if(res.status === "error") {
      displayAlert("danger", res.error)
      return;
    } else {
    //   displayAlert("success", res.message)
      displayData(res.data.resourcess)
    }
    console.log(res.data.resourcess)
  } catch (error) {
    console.log(error)
  }
}

resourceFetch();

// let video;

const displayData = (resources) => {
  const pdfResources = resources.filter((item) => item.type === "video");
  console.log(pdfResources)
//   pdf = pdfResources;
  return pdfResources.map(item => displayItem(item));
}
const displayItem = (item) => {
  const container = document.querySelector(".video-container");
  const div = document.createElement("div");
  div.className = "video-div"
  const pdfLink = document.createElement("a")
  const lessonLink = document.createElement("a")
  const subject = document.createElement("h6")
  const video = document.createElement("video")
  video.className = "video"
  lessonLink.className = "lessonLink"
  pdfLink.href = item.link;
  pdfLink.target = "_blank"
  video.src = item.link;
  video.controls = true;
  pdfLink.append(video)
  lessonLink.href = item.lesson ? `/lesson.html?id=${item.lesson.class}`: "";
  lessonLink.innerHTML = item.title;
  // console.log("5fd22fc9e082eb003c975690", item.lesson._id)
  subject.innerHTML = item.lesson ? `${item.lesson.class.subject}`: ""


  div.append(pdfLink)
  div.append(subject)
  div.append(lessonLink)

  container.append(div);
}