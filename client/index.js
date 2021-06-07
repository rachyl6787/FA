document.addEventListener('DOMContentLoaded', async () => {
  const endpoint = 'https://api.thecatapi.com/v1/images/search';
  const key = 'fcfd8046-817c-40be-aad6-b09b87ba3957';
  const modal = document.getElementById('imageModal');
  let images;

  await fetch(`${endpoint}?limit=50`, {
    headers: {
      'x-api-key': key,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      images = data;
    })
    .catch((err) => {
      return err;
    });

  console.log(images);

  for (let i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.src = images[i].url;
    newImage.id = images[i].id;
    const modalImage = document.getElementById('img');
    newImage.addEventListener('click', () => {
      console.log(newImage.id);
      modal.style.display = 'block';
      modalImage.src = newImage.src;
      const dismiss = document.getElementsByClassName('close')[0];
      dismiss.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });

    const list = document.getElementById('cat-list').appendChild(newImage);
  }
});
