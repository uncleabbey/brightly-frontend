document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstName= document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const passWord = document.getElementById('password').value;
    const subject = document.getElementById('subject').value;
  
    const data = {
      email,
      firstName,
      lastName,
      passWord,
      subject
    };
    const res = await makeFetch(data);
    console.log(res);
    if (res.status === 'error') {
      displayAlert('danger', res.error);
    } else {
      localStorage.setItem('token', res.data.token);
      displayAlert('success', res.message);
    }
  });
  
  
  const makeFetch = async (data) => {
    const url = 'https://brightly-api.herokuapp.com/api/v1/auth/login';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const data_1 = await res.json();
      return data_1;
    } catch (err) {
      return err;
    }
  };
  const displayAlert = (type, message) => {
    const container = document.querySelector('.alert-container');
    const h5 = document.createElement('h5');
    h5.className = `text-center alert alert-dismissables alert-${type}`;
    h5.textContent = message;
    container.append(h5);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  };
  