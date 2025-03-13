function getOverlayTemplate() {

    let overlayTemplateRef = document.getElementById("overlayTemplate")
    return overlayTemplateRef.content.cloneNode(true);
}

function renderContact(id) {
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

function getContactCardTemplate(id) {
    return ` <div class="slider"><div class="pic-and-name">
                <div class="contact-avatar">
                    <div style="background-color:${contacts[id].color};" class="avatar-circle">${contacts[id].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
                </div>
                <div class="name-and-edit">
                    <h2>${contacts[id].name}</h2>
                    <div class="edit-delete-btn">
                        <div onclick="renderEditOverlay(${id})" class="edit-btn"><svg width="24" height="24" viewBox="0 0 24 24"
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
                            <button class="delete-btn-overlay:hover" onclick="deleteContact(${id})">Delete</button>
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
                    <p class="blue-mail">${contacts[id].email}</p>
                    <br style="height:15px;">
                    <h3>Phone</h3>
                    <br style="height:15px;">
                    <p>${contacts[id].phone}</p>
                    <br style="height:15px;">
                </div>
            </div>
            </div>`;
}

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
    }}

function openResponsiveEdit() {
    let editDeleteMenu = document.querySelector('.edit-delete-btn-responsive');
    
    if (editDeleteMenu.classList.contains('slide-in-responsive')) {
        hideResponsiveEditMenu(editDeleteMenu);
    } else {
        showResponsiveEditMenu(editDeleteMenu);
    }
}

function hideResponsiveEditMenu(menu) {
    menu.classList.remove('slide-in-responsive');
    menu.classList.add('slide-out-responsive');
    setTimeout(() => {
        menu.style.display = 'none';
        menu.classList.remove('slide-out-responsive');
    }, 300);
}

function showResponsiveEditMenu(menu) {
    menu.classList.add('slide-in-responsive');
    menu.style.display = 'flex';
    updateResponsiveButtons(menu);
}

function updateResponsiveButtons(menu) {
    let contactId = getCurrentContactId();
    //lieber global definieren und funktionen in der html einbinden ??
    if (contactId === null) return;
    let editBtn = menu.querySelector('.edit-btn-responsive');
    let deleteBtn = menu.querySelector('.delete-btn-responsive');
    if (editBtn) editBtn.setAttribute('onclick', `renderEditOverlay(${contactId})`);
    if (deleteBtn) deleteBtn.setAttribute('onclick', `deleteContact(${contactId})`);
}

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

function renderEditOverlay(id) {
    let overlayContainer = document.getElementById("overlay-container");
    showOverlay();
    overlayContainer.innerHTML = getEditOverlayTemplate(id);
}

function getEditOverlayTemplate(id) {
    return `<section onclick="hideOverlayOnOutsideClick(event)" class="add-contact-overlay">
                <div class="content-overlay-wrapper">
                    <div class="content-overlay-left">
                        <img onclick="hideOverlay()" class="close-mobile-overlay" src="./assets/img/contacts_imgs/close_mobile_overlay.png" alt="">
                        <img src="./assets/img/Logo.png" alt="">
                        <p>Edit contact</p>
                        <div class="blue-line"></div>
                    </div>

                    <div class="content-overlay-right">
                        <div class="contact-avatar">
                            <div style="background-color:${contacts[id].color};" class="avatar-circle">${contacts[id].name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
                        </div>

                        <div class="input-and-close-wrapper"> 
                         <svg class="close-icon" onclick="hideOverlay()"  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71720_5515" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                            <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_71720_5515)">
                             <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6834 22.575 10.4 22.575C10.1167 22.575 9.88338 22.4834 9.70005 22.3C9.51672 22.1167 9.42505 21.8834 9.42505 21.6C9.42505 21.3167 9.51672 21.0834 9.70005 20.9L14.6 16L9.70005 11.1C9.51672 10.9167 9.42505 10.6834 9.42505 10.4C9.42505 10.1167 9.51672 9.88338 9.70005 9.70005C9.88338 9.51672 10.1167 9.42505 10.4 9.42505C10.6834 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0834 9.51672 21.3167 9.42505 21.6 9.42505C21.8834 9.42505 22.1167 9.51672 22.3 9.70005C22.4834 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4834 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4834 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4834 22.1167 22.3 22.3C22.1167 22.4834 21.8834 22.575 21.6 22.575C21.3167 22.575 21.0834 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647" />
                            </g>
                        </svg>  
                        <div class="input-group">
                            <div class="contact-form">
                                <label for="name"></label>
                                <input type="text" id="name" placeholder="Name" class="contact-input" value="${contacts[id].name}">
                                <img class="input-icon" src="./assets/img/contacts_imgs/person.png" alt="Name Icon">

                                <label for="email"></label>
                                <input type="email" id="email" placeholder="Email" class="contact-input" value="${contacts[id].email}">
                                 <img class="input-icon" src="./assets/img/contacts_imgs/mail.png" alt="Email Icon">

                                <label for="phone"></label>
                                <input type="tel" id="phone" placeholder="Phone" class="contact-input" value="${contacts[id].phone}">
                                 <img class="input-icon" src="./assets/img/contacts_imgs/call.png" alt="Phone Icon">
                            </div>
                        </div>

                            <div class="button-group">
                                <button onclick="deleteContact(${id})" id="delte-btn-overlay" class="delete-btn-overlay">Delete</button>
                                <button onclick="editContact(${id})" id="save-btn-overlay" class="save-btn-overlay">Save <img src="./assets/img/check.png" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
}

function contactTemplate(contact) {
    return `<div class="contact-item" onclick="renderContact(${currentId})">
                                <div style="background-color:${contact.color};" id="contactProfilePicture${colorId}" class="contact-profile-picture">${contact.name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
                                <div class="contact-details">
                                    <p class="contact-name">${contact.name}</p>
                                    <p class="contact-email">${contact.email}</p>
                                </div>`
}