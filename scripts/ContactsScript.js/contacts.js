let currentId = 0;
let colorId = 0;
let currentLetter = "";
let selectedContactId = null;

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
  if (!validateForm()) return;
  
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let contact = { 
      name: contactName, 
      email: contactEmail, 
      phone: contactPhone, 
      color: `var(${colors[Math.floor(Math.random() * colors.length)]})` 
  };
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

/**
 * Retrieves an overlay template from the DOM and returns a clone of it.
 * @returns {DocumentFragment} A cloned node of the overlay template.
 */
function getOverlayTemplate() {

  let overlayTemplateRef = document.getElementById("overlayTemplate")
  return overlayTemplateRef.content.cloneNode(true);
}

/**
* Displays the details of a contact with the specified ID and handles responsive layout changes.
* @param {number} id - The index of the contact in the contacts array.
*/
function renderContact(id) {
  updateSelectedContact(id);
  let contactItem = document.getElementById("contact-information");
  contactItem.innerHTML = "";
  contactItem.innerHTML += getContactCardTemplate(id);

  if (window.innerWidth <= 1000) {
    let contactsLeft = document.querySelector('.contacts-content-left');
    let contactsRight = document.querySelector('.contacts-content-right');
    let responsiveEditBtnOne = document.querySelector('.add-contact-btn');
    let responsiveEditBtnTwo = document.querySelector('.edit-contact-btn-responsive');
    contactsLeft.style.display = 'none';
    contactsRight.style.display = 'block';
    responsiveEditBtnOne.style.display = 'none';
    responsiveEditBtnTwo.style.display = 'flex';
  }
}

/**
 * Adjusts the layout for mobile view when going back from contact details to the contact list.
 * This function modifies the display properties of various elements based on screen width.
 */
function responsiveBackBtn() {
  if (window.innerWidth <= 1000) {

    let contactsLeft = document.querySelector('.contacts-content-left');
    let contactsRight = document.querySelector('.contacts-content-right');
    let responsiveEditBtnOne = document.querySelector('.add-contact-btn');
    let responsiveEditBtnTwo = document.querySelector('.edit-contact-btn-responsive');
    contactsLeft.style.display = 'block';
    contactsRight.style.display = 'none';
    responsiveEditBtnOne.style.display = 'flex';
    responsiveEditBtnTwo.style.display = 'none';
  }
}

/**
* Toggles the visibility of the responsive edit menu with animation effects.
* Shows the menu if it's hidden and hides it if it's visible.
*/
function openResponsiveEdit() {
  let editDeleteMenu = document.querySelector('.edit-delete-btn-responsive');

  if (editDeleteMenu.classList.contains('slide-in-responsive')) {
    hideResponsiveEditMenu(editDeleteMenu);
  } else {
    showResponsiveEditMenu(editDeleteMenu);
  }
}

/**
* Hides the responsive edit menu with a slide-out animation.
* @param {HTMLElement} menu - The menu element to hide.
*/
function hideResponsiveEditMenu(menu) {
  menu.classList.remove('slide-in-responsive');
  menu.classList.add('slide-out-responsive');
  setTimeout(() => {
    menu.style.display = 'none';
    menu.classList.remove('slide-out-responsive');
  }, 300);
}

/**
* Shows the responsive edit menu with a slide-in animation and updates the button actions.
* @param {HTMLElement} menu - The menu element to show.
*/
function showResponsiveEditMenu(menu) {
  menu.classList.add('slide-in-responsive');
  menu.style.display = 'flex';
  updateResponsiveButtons(menu);
}

/**
* Updates the onclick attributes of edit and delete buttons in the responsive menu with the current contact ID.
* @param {HTMLElement} menu - The menu element containing the buttons to update.
*/
function updateResponsiveButtons(menu) {
  let contactId = getCurrentContactId();
  //lieber global definieren und funktionen in der html einbinden ??
  if (contactId === null) return;
  let editBtn = menu.querySelector('.edit-btn-responsive');
  let deleteBtn = menu.querySelector('.delete-btn-responsive');
  if (editBtn) editBtn.setAttribute('onclick', `renderEditOverlay(${contactId})`);
  if (deleteBtn) deleteBtn.setAttribute('onclick', `deleteContact(${contactId})`);
}

/**
* Closes the responsive edit menu when a click occurs outside of the menu and its toggle button.
* This function is attached as an event listener to the document.
* @param {Event} event - The click event object.
*/
function closeResponsiveEditOnOutsideClick(event) {
  let editDeleteMenu = document.querySelector('.edit-delete-btn-responsive');
  let editButton = document.querySelector('.edit-contact-btn-responsive');
  if (!editDeleteMenu || editDeleteMenu.style.display !== 'flex' ||
    !editDeleteMenu.classList.contains('slide-in-responsive')) {
    return;
  }
  if (!editDeleteMenu.contains(event.target) && !editButton.contains(event.target)) {
    openResponsiveEdit();
  }
}
document.addEventListener('click', closeResponsiveEditOnOutsideClick);

/**
* Identifies the ID of the currently displayed contact based on the name in the contact details.
* @returns {number|null} The index of the current contact in the contacts array, or null if not found.
*/
function getCurrentContactId() {
  let contactNameElement = document.querySelector('.name-and-edit h2');
  if (!contactNameElement) return null;
  let contactName = contactNameElement.textContent;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === contactName) {
      return i;
    }
  }
  return null;
}

/**
* Displays an overlay with a form for editing an existing contact's information.
* @param {number} id - The index of the contact in the contacts array.
*/
function renderEditOverlay(id) {
  let overlayContainer = document.getElementById("overlay-container");
  showOverlay();
  overlayContainer.innerHTML = getEditOverlayTemplate(id);
}

/**
* Updates the selected contact by highlighting the selected contact item.
* @param {number} id - The index of the contact in the contacts array.
*/
function updateSelectedContact(id) {
  if (selectedContactId !== null) {
    let previousContact = document.getElementById(`contact-item-${selectedContactId}`);
    if (previousContact) {
      previousContact.classList.remove('selected-contact');
    }
  }
  let newContact = document.getElementById(`contact-item-${id}`);
  if (newContact) {
    newContact.classList.add('selected-contact');
  }
  selectedContactId = id;
}

/**
 * Validiert das Kontaktformular durch Überprüfung aller Eingabefelder.
 * Diese Funktion koordiniert den Validierungsprozess.
 * @returns {boolean} True wenn alle Felder gültig sind, sonst false
 */
function validateForm() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  resetValidation([name, email, phone]);
  return checkFormFields(name, email, phone);
}

/**
 * Prüft die einzelnen Formularfelder auf Gültigkeit und zeigt Fehlermeldungen an.
 * Diese Funktion kümmert sich um die eigentliche Validierungslogik.
 * @param {HTMLElement} name - Das Name-Eingabefeld
 * @param {HTMLElement} email - Das Email-Eingabefeld
 * @param {HTMLElement} phone - Das Telefon-Eingabefeld
 * @returns {boolean} True wenn alle Felder gültig sind, sonst false
 */
function checkFormFields(name, email, phone) {
  let isValid = true;
  if (!validateName(name.value)) {
    showError(name, "Please enter a valid name");
    isValid = false;
  }
  if (!validateEmail(email.value)) {
    showError(email, "Please enter a valid email");
    isValid = false;
  }
  if (!validatePhone(phone.value)) {
    showError(phone, "Please enter a valid phone number");
    isValid = false;
  }
  return isValid;
}

/**
 * Validates the name input field.
 * @param {string} name - The name value to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function validateName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s\-]+$/.test(name);
}

/**
 * Validates the email input field.
 * @param {string} email - The email value to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates the phone input field.
 * @param {string} phone - The phone value to validate.
 * @returns {boolean} True if the phone number is valid, false otherwise.
 */
function validatePhone(phone) {
  return /^[\d\s\-\+\(\)]{6,}$/.test(phone);
}

/**
 * Displays an error message for an invalid input field.
 * @param {HTMLElement} input - The input element to show the error for.
 * @param {string} message - The error message to display.
 */
function showError(input, message) {
  input.classList.add('invalid');
  let errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  input.parentNode.appendChild(errorDiv);
}

/**
 * Resets the validation state of input fields by removing error messages and invalid classes.
 * @param {HTMLElement[]} inputs - An array of input elements to reset validation for.
 */
function resetValidation(inputs) {
  inputs.forEach(input => {
    input.classList.remove('invalid');
    let existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  });
}
