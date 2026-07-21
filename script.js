function scrollToNext() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
}

const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
});

const dropDate = new Date("2026-08-01T00:00:00");
setInterval(() => {
    const now = new Date();
    const diff = dropDate - now;

    if (diff <= 0) {
        document.getElementById("timer").innerText = "LIVE NOW";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("timer").innerText =
        `${days}D ${hours}H ${minutes}M`;
}, 1000);

document.getElementById("notifyForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const phone = document.getElementById("phoneInput").value;
    console.log("Phone submitted:", phone);
    document.getElementById("confirmationMessage").classList.remove("hidden");
});
