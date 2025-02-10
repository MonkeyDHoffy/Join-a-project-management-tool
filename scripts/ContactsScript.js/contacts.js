document.addEventListener("DOMContentLoaded", function () {
  //in contacts.html, the contacts are sorted alphabetically and a letter divider is added to separate contacts by the first letter of their name in the div with class "contacts-list"
  let contactsList = document.querySelector(".contacts-list");
  let contactItems = Array.from(
    contactsList.getElementsByClassName("contact-item")
  );

  // Function to sort contact items alphabetically and add letter dividers
  function sortContactItems() {
    // Sort the contact items alphabetically by the text content of the <p> element
    contactItems.sort((a, b) => {
      let nameA = a.querySelector(".contact-name").textContent.toLowerCase();
      let nameB = b.querySelector(".contact-name").textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Clear the current contacts list
    contactsList.innerHTML = "";

    // Track the current starting letter
    let currentLetter = "";

    // Append sorted items to the contacts list with letter dividers
    contactItems.forEach((item) => {
      let name = item.querySelector(".contact-name").textContent;
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
      contactsList.appendChild(item);
    });
  }

  // Initial sorting of contact items
  sortContactItems();
});

//-----------------------------Render--Overlay------------------------------------------------------------------------------

function getOverlayTemplate() {
  return `
      <section class="add-contact-overlay">
          <div class="content-overlay-wrapper">
             
              <div class="content-overlay-left">
                  <img src="./assets/img/Logo.png" alt="">
                  <p>Add contact</p>
                  <span>Tasks are better with a team</span>
                  <div class="blue-line"></div>
              </div>

          
              <div class="content-overlay-right">
                  <div class="contact-avatar">
                      <div class="avatar-circle"><img src="./assets/img/person.png" alt=""></div>
                  </div>

                  <div class="input-group">
                      <div class="contact-form">
                          <label for=""></label>
                          <input type="text" placeholder="enter name" class="contact-input">
                          <label for=""></label>
                          <input type="email" placeholder="enter email" class="contact-input">
                          <label for=""></label>
                          <input type="tel" placeholder="enter number" class="contact-input">
                      </div>

                      <div class="button-group">
                          <button class="delete-btn-overlay">Delete</button>
                          <button class="save-btn-overlay">Create contact ✓</button>
                      </div>
                  </div>
              </div>

              <svg class="close-icon"  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_71720_5515" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                      <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_71720_5515)">
                      <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6834 22.575 10.4 22.575C10.1167 22.575 9.88338 22.4834 9.70005 22.3C9.51672 22.1167 9.42505 21.8834 9.42505 21.6C9.42505 21.3167 9.51672 21.0834 9.70005 20.9L14.6 16L9.70005 11.1C9.51672 10.9167 9.42505 10.6834 9.42505 10.4C9.42505 10.1167 9.51672 9.88338 9.70005 9.70005C9.88338 9.51672 10.1167 9.42505 10.4 9.42505C10.6834 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0834 9.51672 21.3167 9.42505 21.6 9.42505C21.8834 9.42505 22.1167 9.51672 22.3 9.70005C22.4834 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4834 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4834 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4834 22.1167 22.3 22.3C22.1167 22.4834 21.8834 22.575 21.6 22.575C21.3167 22.575 21.0834 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647" />
                  </g>
              </svg>
          </div>
      </section>
  `;
}

// Funktion zum Anzeigen des Overlays
function showOverlay() {
  const overlayContainer = document.getElementById("overlay-container");
  overlayContainer.innerHTML = getOverlayTemplate();

  // Füge die Klasse "show" hinzu, um das Overlay anzuzeigen
  setTimeout(() => {
    document.querySelector(".add-contact-overlay").classList.add("show");
  }, 10);

  // Event-Listener für das Schließen des Overlays
  document.querySelector(".close-icon").addEventListener("click", hideOverlay);
}

// Funktion zum Ausblenden des Overlays
function hideOverlay() {
  const overlay = document.querySelector(".add-contact-overlay");
  if (overlay) {
    overlay.classList.add("hide");
    setTimeout(() => {
      overlay.remove();
    }, 300); // Wartezeit für die Animation
  }
}

// Funktion zum Umschalten des Overlays
function toggleOverlay() {
  const overlay = document.querySelector(".add-contact-overlay");
  if (overlay) {
    hideOverlay();
  } else {
    showOverlay();
  }
}

// Beispiel: Event-Listener für einen Button zum Umschalten des Overlays
document
  .querySelector(".add-new-contact")
  .addEventListener("click", toggleOverlay);
