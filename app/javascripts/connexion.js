const login = document.getElementById("login-btn");
const sign_up = document.getElementById("sign-up-btn");
const styleSheets = document.styleSheets[0];
const login_part = document.getElementById("login-part");
const sign_up_part = document.getElementById("sign-up-part");
const profile_img_container = document.querySelector(".container .image-container");

const pseudo = document.getElementById("pseudo");
const password = document.getElementById("password");
const pseudo_s = document.getElementById("pseudo-s");
const password_s = document.getElementById("password-s");
const help = document.getElementById("indice");

const login_btn = document.getElementById("login");
const sign_up_btn = document.getElementById("sign-up");

const DATABASE = "/app/database/profiles/database.json";

let USER = {};

login.addEventListener('click', () => {
    profile_img_container.innerHTML = `<img src="../../assets/images/profiles/redjohn.jpg" alt="Photo de profile">`;
    sign_up.style.color = '#4D5359';
    login.style.color = 'white'; 
    login_part.classList.toggle('hide');
    sign_up_part.classList.toggle('hide');
    styleSheets.insertRule(
        ".entry-mode::before {transform: translateX(0%);}",
        styleSheets.cssRules.length
    );
});
sign_up.addEventListener('click', () => {
    profile_img_container.innerHTML = `<img src="../../assets/images/profiles/default_profile.jpg" alt="Photo de profile">`;
    sign_up.style.color = 'white';
    login.style.color = '#4D5359'; 
    login_part.classList.toggle('hide');
    sign_up_part.classList.toggle('hide');
    styleSheets.insertRule(
        ".entry-mode::before {transform: translateX(90%);}",
        styleSheets.cssRules.length
    );
});

sign_up_btn.addEventListener('click', () => {
    const pseudo_s_value = pseudo_s.value;
    const password_s_value = password_s.value;
    const help_value = help.value;
    // console.log(pseudo_s_value, password_s_value, help_value);
    sign_up_(pseudo_s_value, password_s_value, help_value);
});

login_btn.addEventListener('click', async () => {
    const pseudo_value = pseudo.value;
    const password_value = password.value;
    // console.log(pseudo_value, password_value);
    login_(pseudo_value, password_value);
});

function updateProfile(img) {
    profile_img_container.innerHTML = `<img src="../../assets/images/profiles/${img}" alt="Photo de profile">`;
}

function sign_up_(pseudo, password, indice) {
    if (!pseudo) {
        console.log('⚠Entrer un pseudo⚠');
        return;
    }
    if (!password) {
        console.log('⚠Entrer un mot de passe⚠');
        return;
    }
    if (!indice) {
        console.log('⚠Entrer un indice⚠');
        return;
    }

    window.electronAPI.readJSON(DATABASE).then((res) => {
        const USERS = res.users;
        let idx = -1;

        USERS.forEach((user) => {
            if (user.pseudo == pseudo) 
                idx = res.users.indexOf(user);
        });

        if (idx > -1) { console.log("⚠Compte indisponible⚠"); }
        else { 
            USER.pseudo = pseudo;
            USER.pic = "default_profile.jpg";
            USER.steak = '00';
            window.sessionStorage.setItem('user', JSON.stringify(USER));
            console.log("✔Enregistrement✔"); 
            window.location.href = "../page/welcome.html";
        }
    });
}

function login_(pseudo, password) {
    if (!pseudo) {
        console.log('⚠Entrer un pseudo⚠');
        return;
    }
    if (!password) {
        console.log('⚠Entrer un mot de passe⚠');
        return;
    }

    window.electronAPI.readJSON(DATABASE).then((res) => {
        const USERS = res.users;
        let idx = -1;

        USERS.forEach((user) => {
            if (user.pseudo == pseudo) 
                idx = res.users.indexOf(user);
        });

        if (idx > -1) {
            updateProfile(USERS[idx].pic);
            if (password == USERS[idx].password) {
                USER.pseudo = USERS[idx].pseudo;
                USER.pic = USERS[idx].pic;
                USER.steak = USERS[idx].steak < 10? `0${USERS[idx].steak}`: `${USERS[idx].steak}`;
                window.sessionStorage.setItem('user', JSON.stringify(USER));
                console.log("✔Comfirmation✔"); 
                window.location.href = "../page/main.html";
            }
            else { console.log('❌Mot de passe incorrect!❌'); }
        } else { console.log("❌Compte indisponible!❌"); }
    });
}