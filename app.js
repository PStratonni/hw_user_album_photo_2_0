const renderUser = (users) => {
  users.forEach((user) => {
    document.querySelector(
      "#wrapper"
    ).innerHTML += `<div id="user_${user.id}" class="users"><h4>${user.name}</h4></div>`;
  });
};

const addEventUsers = () => {
  const divs = document.querySelectorAll("#wrapper div");
  for (div of divs) {
    div.addEventListener("click", (event) => {
      event.preventDefault();
      const [, idUs] = event.currentTarget.id.split("_");
      getAlbum(idUs);
    });
  }
};

const getAlbum = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
    .then((response) => response.json())
    .then((albums) => {
      renderAlbums(albums);
      addEventAlbums();
    });
};

const renderAlbums = (albums) => {
  const ulAlbums = document.querySelector("#albums");
  ulAlbums.innerHTML = "";
  albums.forEach((album) => {
    ulAlbums.innerHTML += `<li><span id="album_${album.id}">${album.title}</span></li>`;
  });
};

const addEventAlbums = () => {
  const lis = document.querySelectorAll("#albums span");
  for (li of lis) {
    li.addEventListener("click", (event) => {
      event.preventDefault();
      const [, idAlbum] = event.target.id.split("_");
      getPhotos(idAlbum);
    });
  }
};

const getPhotos = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    .then((response) => response.json())
    .then((photos) => {
      renderPhotos(photos);
    });
};

const renderPhotos = (photos) => {
  const divPhoto = document.querySelector("#photos");
  divPhoto.innerHTML = "";
  photos.forEach((photo) => {
    divPhoto.innerHTML += `<div><img src=${photo.thumbnailUrl}></div>`;
  });
  divPhoto.parentNode.classList.remove("hiden");
};

const main = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      renderUser(users);
      addEventUsers();
    });
  document.querySelector("#off").addEventListener("click", () => {
    document.querySelector("#off").parentNode.classList.add("hiden");
  });
};

main();
