loadData();

const userDetails = (data) => {
  const avatar = document.querySelector(".avatar");
  const first = document.querySelector(".firstName");
  const formImage = document.querySelector(".form-image");
  first.innerHTML = data.firstName;
  avatar.src = data.avatar;
  formImage.src = data.avatar;
  const name = document.querySelector(".profile-name");
  const profile = document.querySelector(".profile-image");
  name.innerHTML = `${data.firstName} ${data.lastName}`;
  profile.src = data.avatar;
};

let resp;

const url = new URL(location.href);
const id = url.searchParams.get("id");

const fetchLessonData = async () => {
  try {
    const url = `https://brightly-api.herokuapp.com/api/v1/class/${id}`;
    // const url = `http://localhost:3000/api/v1/class/${id}`;
    const res = await makeFetch(url);
    if (res.status === "success") {
      displayAlert("success", res.message);
      console.log(res.data);
      resp = res.data.class;
      displayData(res.data.class);
    } else {
      displayAlert("danger", res.error);
      location.href = "/login.html"
    }
  } catch (error) {
    console.log(error);
  }
};
fetchLessonData();
const displayData = (data) => {
  const container = document.querySelector(".lesson-container");
  const title = document.querySelector("#title");

  title.innerHTML = data.subject;

  const head = document.createElement("div");
  head.className = "class-head";

  const lessonTitle = document.createElement("h4");
  lessonTitle.innerHTML = data.lessons[0].title;
  const obj = document.createElement("p");
  obj.className = "obj";
  obj.innerHTML =
    "Learning Objectives: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, autem?";
  head.append(lessonTitle);
  head.append(obj);

  const body = document.createElement("div");
  body.className = "class-body";
  body.innerHTML = data.lessons[0].body;
  container.append(head);
  container.append(body);

  // display the video to the  UI
  const videoContainer = document.querySelector(".video");

  const video = document.createElement("video");

  video.src = data.lessons[0].resources.filter(
    (resource) => resource.type === "video"
  )[0]
    ? data.lessons[0].resources.filter(
        (resource) => resource.type === "video"
      )[0].link
    : "";
  video.controls = true;
  videoContainer.append(video);

  data.lessons[0].comments.map((comment) => {
    const comments = document.querySelector(".comments");
    const div = document.createElement("div");
    div.className = "comment";
    const commentBody = document.createElement("div");
    commentBody.className = "comment-body";
    const avatar = document.createElement("img");
    const h6 = document.createElement("h6");
    const p = document.createElement("p");
    const date = document.createElement("small");
    const time = document.createElement("small");
    const dateCont = document.createElement("div");
    dateCont.className = "date-container";

    date.innerHTML = new Date(comment.createdAt).toLocaleDateString();
    time.innerHTML = new Date(comment.createdAt).toLocaleTimeString();

    dateCont.append(date);
    dateCont.append(time);
    avatar.src = comment.author.avatar;
    h6.innerHTML = `${comment.author.firstName} ${comment.author.lastName}`;
    p.innerHTML = comment.body;

    commentBody.append(h6);
    commentBody.append(p);
    div.append(avatar);
    div.append(commentBody);
    div.append(dateCont);
    comments.append(div);
  });
};

document.getElementById("send").addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("comment-input").value;

  const id = resp.lessons[0]._id;
  const url = `https://brightly-api.herokuapp.com/api/v1/lessons/${id}/comments`;
  // const url = `http://localhost:3000/api/v1/lessons/${id}/comments`;
  const data = {
    body: input,
  };
  const addComment = async () => {
    try {
      const res = await handleComments(data, url);
      if (res.status === "success") {
        displayAlert("success", res.message);
        console.log(res.data);
        addCommentToUI(res.data);
        document.getElementById("comment-input").value = "";
      } else {
        displayAlert("danger", res.error);
        // location.href = "/login.html"
      }
    } catch (error) {
      console.log(error);
    }
  };
  addComment();
});

const handleComments = async (data, url) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data_1 = await res.json();
    return data_1;
  } catch (err) {
    return err;
  }
};

const addCommentToUI = (data) => {
  // display the comment to the UI
  const comments = document.querySelector(".comments");
  const div = document.createElement("div");
  div.className = "comment";
  const commentBody = document.createElement("div");
  commentBody.className = "comment-body";
  const avatar = document.createElement("img");
  const h6 = document.createElement("h6");
  const p = document.createElement("p");
  const date = document.createElement("small");
  const time = document.createElement("small");
  const dateCont = document.createElement("div");
  dateCont.className = "date-container";

  date.innerHTML = new Date(data.comment.createdAt).toLocaleDateString();
  time.innerHTML = new Date(data.comment.createdAt).toLocaleTimeString();

  dateCont.append(date);
  dateCont.append(time);
  avatar.src = data.author.avatar;
  h6.innerHTML = `${data.author.firstName} ${data.author.lastName}`;
  p.innerHTML = data.comment.body;

  commentBody.append(h6);
  commentBody.append(p);
  div.append(avatar);
  div.append(commentBody);
  div.append(dateCont);
  comments.append(div);
};
