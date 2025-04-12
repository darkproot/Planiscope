const annuler = document.getElementById("annuler");
const ok = document.getElementById("ok");

annuler.addEventListener('click', () => {
    window.electronAPI.closeWeekGoal();
});