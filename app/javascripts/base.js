const close_btn = document.getElementById("__destroy");
const reduce_btn = document.getElementById("__reduce");
const zoom_btn = document.getElementById("__zoom");

close_btn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
});

reduce_btn.addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
});

zoom_btn.addEventListener('click', () => {
    window.electronAPI.zoomWindow();
});