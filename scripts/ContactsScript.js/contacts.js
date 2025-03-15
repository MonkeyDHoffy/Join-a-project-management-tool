let currentId = 0;
let colorId = 0;
let currentLetter = "";

/**
 * Initializes the contacts page by rendering user icon name, retrieving contacts data, and displaying contacts.
 * @async
 * @returns {Promise<void>}
 */
async function init() {
  renderUserIconName();
  await getContacts();
  displayContacts();
}

/**
 * Creates a new contact with form input values, adds it to contacts array and updates the backend.
 * @async
 * @returns {Promise<void>}
 */
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

/**
 * Updates an existing contact with the provided ID using form input values.
 * @async
 * @param {number} id - The index of the contact to edit in the contacts array
 * @returns {Promise<void>}
 */
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

/**
 * Removes a contact with the specified ID from the contacts array and updates the backend.
 * @async
 * @param {number} id - The index of the contact to delete in the contacts array
 * @returns {Promise<void>}
 */
async function deleteContact(id) {
  let contactItem = document.getElementById("contact-information");
  contacts.splice(id, 1);
  console.log(contacts);
  await putData("contacts/", contacts);
  hideOverlay();
  contactItem.innerHTML = "";
  await init();
}

/**
 * Renders all contacts in the contacts list with alphabetical letter dividers.
 * @returns {void}
 */
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
    currentId++;
  });
  currentId = 0;
}

/**
 * Adds a letter divider to the contacts list to organize contacts alphabetically.
 * @param {string} firstLetter - The first letter to display in the divider
 * @param {HTMLElement} contactsList - The container element for the contacts list
 * @returns {void}
 */
function addLetterDivider(firstLetter, contactsList) {
  currentLetter = firstLetter;
  let letterDivider = document.createElement("div");
  letterDivider.className = "letter-divider";
  letterDivider.innerHTML = `<p class="current-letter-b">${currentLetter}</p><hr>`;
  contactsList.appendChild(letterDivider);
}

/**
 * Hides the overlay when clicking outside of it, unless clicking on specific excluded elements.
 * @param {Event} event - The click event object
 * @returns {void}
 */
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

/**
 * Displays the contact overlay and applies animation for a smooth appearance.
 * @returns {void}
 */
function showOverlay() {
  let overlayContainer = document.getElementById("overlay-container");
  let overlayTemplate = getOverlayTemplate();
  overlayContainer.append(overlayTemplate);
  document.querySelector(".dark-background").style.display = "block";
  setTimeout(() => {
    document.querySelector(".dark-background").classList.add("overlay-open");
  }, 10);
}

/**
 * Hides the contact overlay with an animation and removes it from the DOM.
 * @returns {void}
 */
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

/**
 * Shows a temporary notification that disappears after a set duration.
 * @returns {void}
 */
function showClickNotification() {
  let notification = document.querySelector(".click-notification");
  if (notification) {
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }
}
