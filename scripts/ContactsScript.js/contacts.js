let contacts = [];
let currentId = 0;
let currentLetter = "";

async function getContacts() {
  contacts = Object.values(await getData("contacts/"));
  console.log(contacts);
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  displayContacts();
}

async function createContact() {
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let contact = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  };
  contacts.push(contact);
  await putData("contacts/", contacts);
  hideOverlay();
  await getContacts();
  showClickNotification();
}

async function editContact(id) {
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let editedContact = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  };
  contacts[id] = editedContact;
  await putData("contacts/", contacts);
  hideOverlay();
  await getContacts();
  showClickNotification();
}

async function deleteContact(id) {
  let contactItem = document.getElementById("contact-information");
  contacts.splice(id, 1);
  console.log(contacts);
  await putData("contacts/", contacts);
  await getContacts();
  hideOverlay();
  contactItem.innerHTML = "";
}

function displayContacts() {
  let contactsList = document.querySelector(".contacts-list");
  contactsList.innerHTML = "";
  contacts.forEach((contact) => {
    let name = contact.name;
    let firstLetter = name.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      addLetterDivider(firstLetter, contactsList);
    }
    contactsList.innerHTML += contactTemplate(contact, currentId);
    currentId++;
  });
  currentId = 0;
}

function addLetterDivider(firstLetter, contactsList) {
  currentLetter = firstLetter;
  let letterDivider = document.createElement("div");
  letterDivider.className = "letter-divider";
  letterDivider.innerHTML = `<p class="current-letter-b">${currentLetter}</p><hr>`;
  contactsList.appendChild(letterDivider);
}

function hideOverlayOnOutsideClick(event) {
  let overlayWrapper = document.querySelector(".content-overlay-wrapper");
  if (overlayWrapper && !overlayWrapper.contains(event.target) && !event.target.closest(".add-new-contact") && !event.target.closest(".edit-btn")) {
    hideOverlay();
  }
};

function showOverlay() {
  let overlayContainer = document.getElementById("overlay-container");
  overlayContainer.innerHTML = getOverlayTemplate();
  document.querySelector(".dark-background").style.display = "block";
  setTimeout(() => {
    document.querySelector(".dark-background").classList.add("overlay-open");
  }, 10);
}

function hideOverlay() {
  let overlay = document.querySelector(".add-contact-overlay");
  let darkBackground = document.querySelector(".dark-background");
  if (overlay) {
    overlay.classList.add("hide");
    darkBackground.classList.remove("overlay-open");
    setTimeout(() => {
      overlay.remove();
      darkBackground.style.display = "none";
    }, 300);
  }
}

function showClickNotification() {
  let notification = document.querySelector(".click-notification");
  if (notification) {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
}