const USER = JSON.parse(window.sessionStorage.getItem('user'));

const pseudo = document.getElementById("pseudo");
const image_container = document.querySelector(".image-container");

// Chargement du pseudo et de la photo de profile sur la page
const img_path = window.electronAPI.pathJoin(`/assets/images/profiles/${USER.pic}`);
img_path.then((res) => {
    image_container.innerHTML = `<img src="${res}" alt="Photo de profile">`;
});
pseudo.innerText = USER.pseudo.toWellFormed();

const button = document.getElementById("end_btn");
button.addEventListener('click', () => {
    window.location.href = "../page/main.html";
});