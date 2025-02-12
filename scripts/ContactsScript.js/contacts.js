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
                  <span>Tasks are better with a team!</span>
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

              <svg class="close-icon" onclick="hideOverlay()"  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
}

function renderContact() {
  let contactItem = document.getElementById("contact-information");
  contactItem.innerHTML = "";
  contactItem.innerHTML += ` <div class="slider"><div class="pic-and-name">
                                <div class="contact-avatar">
                                    <div class="avatar-circle">TW</div>
                                </div>
                                <div class="name-and-edit">
                                    <h1>Max Mustermann</h1>
                                    <div class="edit-delete-btn">
                                        <div class="edit-btn"><svg width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_282006_3798" style="mask-type:alpha"
                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_282006_3798)">
                                                    <path
                                                        d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                                        fill="#2A3647" />
                                                </g>
                                            </svg>
                                            <button>Edit</button>
                                        </div>
                                        <div class="delete-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <mask id="mask0_282006_2518" style="mask-type:alpha"
                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                    <rect width="24" height="24" fill="#D9D9D9" />
                                                </mask>
                                                <g mask="url(#mask0_282006_2518)">
                                                    <path
                                                        d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                                                        fill="#2A3647" />
                                                </g>
                                            </svg>
                                            <button onclick="deleteContact()">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <span>Contact Information</span>
                            <br><br>

                            <div class="mail-and-number">

                                <div>
                                    <h3>Email</h3>
                                    <br style="height:15px;">
                                    <p class="blue-mail">maxmustermann@beispiel.com</p>
                                    <br style="height:15px;">
                                    <h3>Phone</h3>
                                    <br style="height:15px;">
                                    <p>+49 123 456 789</p>
                                    <br style="height:15px;">
                                </div>
                            </div>
                            </div>`;
}

function deleteContact() {
  let contactItem = document.getElementById("contact-information");
  contactItem.innerHTML = "";
}
