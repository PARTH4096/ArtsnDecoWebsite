// Getting existing data for selected profile from backend
(async () => {
  try {
    const response = await (
      await fetch(`${url}/profile/id/${localStorage.getItem('profileId')}`, {
        method: 'GET',
        headers: { token: `${localStorage.getItem('token')}` },
      })
    ).json();

    document.querySelector('#name').value = response.data.name;
    document.querySelector('#post').value = response.data.post;
    document.querySelector('#insta-link').value = response.data.insta;
  } catch (err) {
    console.log(err);
  }
})();

// Sending updated profile data to backend
document
  .getElementById('update-profile')
  .addEventListener('click', async () => {
    try {
      const name = document.querySelector('#name').value;
      const post = document.querySelector('#post').value;
      const insta = document.querySelector('#insta-link').value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('post', post);
      formData.append('insta', insta);
      formData.append('_id', localStorage.getItem('profileId'));

      spinner('.updated-profile');

      const response = await (
        await fetch(`${url}/profile/update`, {
          method: 'PUT',
          headers: { token: `${localStorage.getItem('token')}` },
          body: formData,
        })
      ).json();

      $('.updated-profile').empty();

      if (response.ok) {
        window.location.href = 'profiles.html';
      } else {
        document.querySelector('.update-profile-error-alert').style.display =
          'block';
      }
    } catch (err) {
      console.log(err);
    }
  });
