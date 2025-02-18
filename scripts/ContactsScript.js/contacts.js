const BASE_URL = "https://remotestorage-f4b14-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let currentId = 0;

async function getContacts() {
  try {
    let response = await fetch(BASE_URL + "contacts.json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    contacts = responseToJson ? Object.values(responseToJson) : [];
    console.log(contacts);
  } catch (error) {
    console.error(error);
  }

  contacts.sort((a, b) => a.name.localeCompare(b.name));
  console.log(contacts);
  displayContacts();
}



function displayContacts() {
  //in contacts.html, the contacts are sorted alphabetically and a letter divider is added to separate contacts by the first letter of their name in the div with class "contacts-list"
  let contactsList = document.querySelector(".contacts-list");
  
    // Clear the current contacts list
    contactsList.innerHTML = "";

    // Track the current starting letter
    let currentLetter = "";
    
    // Append sorted items to the contacts list with letter dividers
    contacts.forEach((contact) => {
      
      let name = contact.name;
      let email = contact.email;
      let firstLetter = name.charAt(0).toUpperCase();

      // If the first letter has changed, add a new letter divider
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        let letterDivider = document.createElement("div");
        letterDivider.className = "letter-divider";
        letterDivider.innerHTML = `<p class="current-letter-b">${currentLetter}</p><hr>`;
        contactsList.appendChild(letterDivider);
      }

      // Append the item to the contacts list
      contactsList.innerHTML += contactTemplate(contact, currentId);
      currentId++;
    });
    currentId = 0;
  }

  // Add event listener to dark background to hide overlay on click
  // document.querySelector(".dark-background").addEventListener("click", hideOverlay);

  // Add event listener to close overlay when clicking outside of .content-overlay-wrapper
  document.addEventListener("click", function (event) {
    let overlayWrapper = document.querySelector(".content-overlay-wrapper");
    if (
      overlayWrapper &&
      !overlayWrapper.contains(event.target) &&
      !event.target.closest(".add-new-contact") &&
      !event.target.closest(".edit-btn")
    ) {
      hideOverlay();
    }

    
  });

// Funktion zum Anzeigen des Overlays
function showOverlay() {
  let overlayContainer = document.getElementById("overlay-container");
  overlayContainer.innerHTML = getOverlayTemplate();
  document.querySelector(".dark-background").style.display = "block";
}

// Funktion zum Ausblenden des Overlays
function hideOverlay() {
  let overlay = document.querySelector(".add-contact-overlay");
  if (overlay) {
    overlay.classList.add("hide");
    setTimeout(() => {
      overlay.remove();
      document.querySelector(".dark-background").style.display = "none";
    }, 300);
  }
  showClickNotification();
}

function deleteContact() {
  let contactItem = document.getElementById("contact-information");
  contactItem.innerHTML = "";
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

async function putContact(contact) {
  try {
    let response = await fetch(BASE_URL + "contacts.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    let responseToJson = await response.json();
    console.log(responseToJson);
  } catch (error) {
    console.error(error);
  }
  getContacts();
}

function createContact() {
  let contactName = document.getElementById("name").value;
  let contactEmail = document.getElementById("email").value;
  let contactPhone = document.getElementById("phone").value;
  let contact = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
  };
  putContact(contact);
  hideOverlay();
}