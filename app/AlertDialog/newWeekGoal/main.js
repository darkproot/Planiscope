let data = {};

let isNewDomaineDisplay = false;
let new_domaine = [];

const annuler = document.getElementById("annuler");
annuler.addEventListener('click', () => {
    window.electronAPI.closeWeekGoal();
});

const display_new_domaine_btn = document.getElementById("new-domaine-btn");
display_new_domaine_btn.addEventListener('click', () => {
    const new_domaine_container = document.getElementById("new-domaine-container");
    new_domaine_container.style.display = isNewDomaineDisplay ? 'none': 'flex';
    isNewDomaineDisplay = !isNewDomaineDisplay;
})

const add_domaine_btn = document.getElementById("add-domaine");
add_domaine_btn.addEventListener('click', () => {
    const texte = document.getElementById("new-domaine-text");
    const couleur = document.getElementById("new-color");

    if (texte.value && couleur.value) {
        const new_domaine_container = document.getElementById("new-domaine-container");
        new_domaine_container.style.display = isNewDomaineDisplay ? 'none': 'flex';
        isNewDomaineDisplay = !isNewDomaineDisplay;

        const domaine = document.getElementById("domaine");
        domaine.innerHTML += `<option value="${texte.value}">${texte.value}</option>`;
        
        new_domaine.push(couleur.value);
        new_domaine.push(texte.value)

        texte.value = '';
        couleur.value = '#ffffff';
    }
})


function card(time, text) {
    const TEMPLATE = `
    <div class="card-item">
        <input type="time" name="time" value=${time}>
        <p>${text}</p>
        <button>delete</button>
    </div>`;

    return TEMPLATE;
}

const TIMES = [
    document.getElementById("lundi-time-input"),
    document.getElementById("mardi-time-input"),
    document.getElementById("mercredi-time-input"),
    document.getElementById("jeudi-time-input"),
    document.getElementById("vendredi-time-input"),
    document.getElementById("samedi-time-input"),
    document.getElementById("dimanche-time-input")
];

const TEXTS = [
    document.getElementById("lundi-text-input"),
    document.getElementById("mardi-text-input"),
    document.getElementById("mercredi-text-input"),
    document.getElementById("jeudi-text-input"),
    document.getElementById("vendredi-text-input"),
    document.getElementById("samedi-text-input"),
    document.getElementById("dimanche-text-input"),
]

const BUTTONS = [
    document.getElementById("lundi-add-button"),
    document.getElementById("mardi-add-button"),
    document.getElementById("mercredi-add-button"),
    document.getElementById("jeudi-add-button"),
    document.getElementById("vendredi-add-button"),
    document.getElementById("samedi-add-button"),
    document.getElementById("dimanche-add-button"),
]

const DISPLAY = [
    document.getElementById("lundi-card-display"),
    document.getElementById("mardi-card-display"),
    document.getElementById("mercredi-card-display"),
    document.getElementById("jeudi-card-display"),
    document.getElementById("vendredi-card-display"),
    document.getElementById("samedi-card-display"),
    document.getElementById("dimanche-card-display"),
]

const CARDS = [
    [
        ["12:34", "Apprendre Python"],
        ["02:04", "Apprendre Javascript"]
    ],
    [],
    [],
    [
        ["15:30", "R-A-S"],
        ["19:00", "Analyse numerique"]
    ],
    [],
    [],
    []
]

function update_cards() {
    for (i in CARDS) {
        let list = []
        CARDS[i].forEach(item => {
            list.push(card(item[0], item[1]))
        })

        DISPLAY[i].innerHTML = list.join('\n');
    }
}
update_cards();

BUTTONS.forEach((button) => {
    button.addEventListener('click', () => {
        let idx = BUTTONS.indexOf(button);
        const text = TEXTS[idx].value;
        const time = TIMES[idx].value;

        if (text && time) {
            TEXTS[idx].value = '';
            TIMES[idx].value = '';

            CARDS[idx].push([time, text]);
            update_cards();
        }
    })
})

const ok = document.getElementById("ok");
ok.addEventListener('click', () => {
    const title = document.getElementById("title");
    const domaine = document.getElementById("domaine");
    const newDomaine = new_domaine;
    const data = CARDS;
    if (!title.value) {
        alert("Entrer un titre");
        return;
    }

    let result = {
        title: title.value,
        domaine: domaine.value,
        createdDomaine: newDomaine,
        data: data
    }

    console.log(result);
})