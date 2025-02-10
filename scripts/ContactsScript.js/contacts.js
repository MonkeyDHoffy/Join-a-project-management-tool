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
