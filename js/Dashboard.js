let dateElement = document.getElementById("date");
let anotherDateElement = document.getElementById("date2");


let options = {weekday: "short", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
anotherDateElement.innerHTML= today.toLocaleDateString("en-US", options);


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
    
    try {
        const res = await makeFetch(url)
        console.log(res.data)
        if(res.status === "success") {
            const first = document.querySelector(".firstName");
            const { firstName} = res.data.user;
           first.innerHTML = firstName;
        }
    } catch (error) {
        console.log(error)
    }
}

loadData()
