export function openModal({ title, content, onConfirm }) {
  // Evita modales duplicados
  document.getElementById("spa-modal")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "spa-modal";
  overlay.className = "modal-overlay";

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

  const close = () => overlay.remove();
  overlay.querySelector(".modal-close") .addEventListener("click", close);
  overlay.querySelector(".btn-cancel")  .addEventListener("click", close);
  overlay.querySelector(".btn-confirm") .addEventListener("click", () => {
    onConfirm();
    close();
  });

}

export function closeModal() {
  document.getElementById("spa-modal")?.remove();
}