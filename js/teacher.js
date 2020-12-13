  const displayAlert = (type, message) => {
    const container = document.querySelector('.alert-container');
    const h5 = document.createElement('h5');
    h5.className = `text-center alert alert-dismissables alert-${type}`;
    h5.textContent = message;
    container.append(h5);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  };
document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName= document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const subject = document.getElementById('subject').value;
    const emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
    if(!firstName || !lastName || !subject || !email || !password) {
      displayAlert("danger", "Sorry, Fields cannot be empty");
      return;
    } 
    if (!emailRegex.test(email)) {
      displayAlert("danger", "Email not Valid");
      return;
    }
    const data = {
      email,
      firstName,
      lastName,
      password,
      subject
    };
    const url = 'https://brightly-api.herokuapp.com/api/v1/auth/signup/teacher';
    // const url = 'http://localhost:3000/api/v1/auth/signup/teacher';
    const res = await makeFetch(data, url);
    console.log(res);
    if (res.status === 'error') {
      displayAlert('danger', res.error);
    } else {
      localStorage.setItem('token', res.data.token);
      displayAlert('success', res.message);
      location.href = "/dashboard.html"
    }
  });

  const makeFetch = async (data, url) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return err;
    }
};
