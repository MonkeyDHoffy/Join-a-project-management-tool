
let currentId = 0;
let colorId = 0;
let currentLetter = "";

async function init() {
  await getContacts();
  displayContacts();
}

async function createContact() {
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let contact = {name: contactName, email: contactEmail, phone: contactPhone, color: `var(${colors[Math.floor(Math.random() * colors.length)]})`};
  contacts.push(contact);
  await putData("contacts/", contacts);
  hideOverlay();
  init();
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
    color: contacts[id].color
  };
  contacts[id] = editedContact;
  await putData("contacts/", contacts);
  hideOverlay();
  init();
  renderContact(id);
}

async function deleteContact(id) {
  let contactItem = document.getElementById("contact-information");
  contacts.splice(id, 1);
  console.log(contacts);
  await putData("contacts/", contacts);
  hideOverlay();
  contactItem.innerHTML = "";
  await init();
}

function displayContacts() {
  let contactsList = document.querySelector(".contacts-list");
  if (!contactsList) {
    console.error("Element with class 'contacts-list' not found.");
    return;
  }
  contactsList.innerHTML = "";
  contacts.forEach((contact) => {
    let firstLetter = contact.name.charAt(0).toUpperCase();
    if (firstLetter !== currentLetter) {
      addLetterDivider(firstLetter, contactsList);
    }
    contactsList.innerHTML += contactTemplate(contact, currentId);
    // applyRandomColorToClass(color);
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
  if (
    overlayWrapper &&
    !overlayWrapper.contains(event.target) &&
    !event.target.closest(".add-new-contact") &&
    !event.target.closest(".edit-btn")
  ) {
    hideOverlay();
  }
}

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
