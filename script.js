const chatBody = document.querySelector("#chat-body");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");

async function configureWhatsAppLink() {
    try {
        const response = await fetch("/api/config");
        if (!response.ok) return;
        const { whatsappNumber } = await response.json();
        if (!whatsappNumber) return;
        document.querySelectorAll(".whatsapp-link").forEach((link) => {
            link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Quero começar a praticar inglês.")}`;
            link.target = "_blank";
            link.rel = "noopener";
        });
    } catch {
        // A demonstração continua funcionando quando o HTML é aberto sem o backend.
    }
}

configureWhatsAppLink();

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}-message`;
    message.textContent = text;
    chatBody.insertBefore(message, chatBody.querySelector(".typing"));
}

document.querySelectorAll(".quick-options button").forEach((button) => {
    button.addEventListener("click", () => {
        addMessage(button.dataset.message, "user");
        addMessage("Awesome! Vamos praticar juntos. Tell me: what is your favorite thing to do after work?", "bot");
    });
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";
    window.setTimeout(() => {
        addMessage("Nice answer! ✨ Uma forma ainda mais natural seria: “I usually ...”. Quer continuar praticando?", "bot");
    }, 450);
});
