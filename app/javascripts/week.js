const dashboard = document.getElementById("dashbord-section");
const USER = JSON.parse(window.sessionStorage.getItem('user'));
const profile = document.getElementById('profile');

window.electronAPI.pathJoin(`/assets/images/profiles/${USER.pic}`).then((res) => {
    profile.src = res;
});

dashboard.addEventListener('click', () => {
    window.location.href = "../page/main.html";
});

const new_btn = document.getElementById("new_btn");
new_btn.addEventListener('click', () => {
    window.electronAPI.newWeekGoal();
});