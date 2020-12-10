const userDetails = {
    firstName: "Evelyn",
    lastName: "Okereke",
    email: "okerekeEvy@gmail.com",
    password: "babalawonimi"
  }
  
  const email = document.getElementById("email");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const password = document.getElementById("password");
  
  
  email.value = userDetails.email;
  firstName.value = userDetails.firstName;
  lastName.value = userDetails.lastName;
  password.value = userDetails.password;

  