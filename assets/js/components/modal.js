export function openModal({ title, content, onConfirm }) {
  //Delete existing modal if exists to avoid duplicates
  document.getElementById("spa-modal")?.remove();

  const overlay = document.createElement("div");

  overlay.id = "spa-modal"; // set id for modal to manage it later
  overlay.className = "modal-overlay"; // class for styling the overlay and modal, defined in styles.css
  
// Modal structure with header, body and footer. The content is dynamic based on the parameters passed to openModal
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">✕</button>
      </div>
      <div class="modal-body">${content}</div>
      <div class="modal-footer">
        <button class="btn btn-secondary btn-cancel">Cancelar</button>
        <button class="btn btn-primary btn-confirm">Confirmar</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove(); // fuction for close modal
  overlay.querySelector(".modal-close") .addEventListener("click", close); // close modal when click on X
  overlay.querySelector(".btn-cancel")  .addEventListener("click", close); // close modal when click on cancel
  overlay.querySelector(".btn-confirm") .addEventListener("click", () => { // when click on confirm, execute onConfirm and close modal
    onConfirm(); // execute callback
    close(); // close modal after confirm
  });

}

export function closeModal() {
  document.getElementById("spa-modal")?.remove(); // close modal if exists
}