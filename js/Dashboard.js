let dateElement = document.getElementById("date");
let anotherDateElement = document.getElementById("date2");


let options = {weekday: "short", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML= today.toLocaleDateString("en-US", options);
anotherDateElement.innerHTML= today.toLocaleDateString("en-US", options);

const loadData = async () => {
    const url = "https://brightly-api.herokuapp.com/api/v1/auth/me";
    
    try {
        const res = await makeFetch(url)
        console.log(res.data)
        if(res.status === "success") {
            displayAlert("success", res.message)
            const first = document.querySelector(".firstName");
            const { firstName} = res.data.user;
            first.innerHTML = firstName;
        } else {
          displayAlert("danger", res.error);
          location.href = "/login.html"
        } 
        
    } catch (error) {
        console.log(error)
    }
}

// initialize load data
loadData()
