const USER = JSON.parse(window.sessionStorage.getItem('user'));
const pseudo = document.querySelector("#profile-container p");
const profile_pic = document.getElementById("image-container");
const steak = document.getElementById("steak");

window.electronAPI.pathJoin(`/assets/images/profiles/${USER.pic}`).then((res) => {
    profile_pic.innerHTML = `<img src="${res}" alt="photo de profile">`;
});
pseudo.innerHTML = `<p>${USER.pseudo}</p>`;
steak.innerText = USER.steak;

const week_section = document.getElementById("week-section");

console.log(week_section)
week_section.addEventListener('click', () => {
    window.location.href = "../page/week.html";
});