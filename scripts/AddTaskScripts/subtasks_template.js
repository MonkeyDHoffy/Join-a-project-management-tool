/**
 * Generate HTML template for a subtask item
 * @param {HTMLInputElement} subtaskInput - The input element containing the subtask value
 * @returns {string} HTML template for the subtask item
 */
function subtaskListTemplate(subtaskInput) {
    return `<div class="subtask-item-field">
                <li class="item-${subtaskInput.value.replaceAll(" ", "-")} subtask-item">
                    ${subtaskInput.value}
                </li>
                <div class="btn-section">
                    <img onclick="editSubtaskItem('${subtaskInput.value}')" class="edit-subtask-item-btn" src="./assets/svg/contacts_svg/edit.svg" alt="">
                    <img onclick="deleteSubtaskItem(this)" class="delete-subtask-item-btn"src="./assets/svg/contacts_svg/delete.svg" alt="">
                </div>
            </div>`;
  }