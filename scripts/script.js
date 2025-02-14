let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'status': 'toDo'
}, {
    'id': 1,
    'title': 'Kochen',
    'status': 'inProgress'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'status': 'awaitFeedback'
}, {
    'id': 3,
    'title': 'Rasen mähen',
    'status': 'awaitFeedback'
}
];
const BASE_URL = "https://remotestorage-f4b14-default-rtdb.europe-west1.firebasedatabase.app/";



function regsterUser() {
    let name = "daniela";
    let email = "daniela@example.com";
    let passwort = "ertezrz";

    let user = {
        'name': name,
        'email': email,
        'passwort': passwort
    };
    putData("tasks", user);
}
async function putData(path, data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let responseToJson = await response.json();
    return responseToJson;
}