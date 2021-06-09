document.addEventListener('DOMContentLoaded', async () => {
  const endpoint = 'https://api.thecatapi.com/v1/images/search';
  const key = 'fcfd8046-817c-40be-aad6-b09b87ba3957';
  const modal = document.getElementById('imageModal');
  let images;

  await fetch(`${endpoint}?limit=60`, {
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
  let x = 0;

  for (let i = 0; i < images.length / 10; i++) {
    const newButton = document.createElement('button');
    newButton.innerText = i + 1;
    newButton.addEventListener('click', (e) => {
      x = (newButton.innerText - 1) * 10;
      const remove = document.getElementsByClassName('imagePage');
      while (remove.length > 0) {
        remove[0].parentNode.removeChild(remove[0]);
      }

      for (let i = x; i < x + 10; i++) {
        const newImage = document.createElement('img');
        newImage.src = images[i].url;
        newImage.className = 'imagePage';
        const modalImage = document.getElementById('img');
        newImage.addEventListener('click', () => {
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

    const pagination = document
      .getElementById('pagination')
      .appendChild(newButton);
  }
  console.log('x: ', x);

  for (let i = x; i < x + 10; i++) {
    const newImage = document.createElement('img');
    newImage.src = images[i].url;
    newImage.className = 'imagePage';
    const modalImage = document.getElementById('img');
    newImage.addEventListener('click', () => {
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
