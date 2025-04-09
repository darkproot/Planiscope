const close_btn = document.getElementById("__destroy");

close_btn.addEventListener('click', () => {
    window.electronAPI.closeWindow();
});