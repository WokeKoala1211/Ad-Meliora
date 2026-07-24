/* Countdown for 9:30 PM today */
function startCountdown() {
    const dropDate = new Date("2026-07-23T21:30:00");

    function updateTimer() {
        const now = new Date();
        const diff = dropDate - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerText = "LIVE NOW";
            return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("countdown").innerText =
            `${hours}H ${minutes}M ${seconds}S`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

startCountdown();

/* Phone Number Submission */
let lastSubmitTime = 0;

document.getElementById("notifyForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const phone = document.getElementById("phoneInput").value.trim();
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const nowTime = Date.now();
    if (nowTime - lastSubmitTime < 5000) {
        alert("Please wait a moment before submitting again.");
        return;
    }
    lastSubmitTime = nowTime;

    const button = document.querySelector("#notifyForm button");
    button.disabled = true;
    button.innerText = "Sending...";

    const response = await fetch("https://admeliora-notify-backend.onrender.com/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned })
    });

    button.disabled = false;
    button.innerText = "Notify Me";

    if (response.ok) {
        document.getElementById("confirmationMessage").classList.add("visible");
    } else {
        alert("Error saving your number. Try again.");
    }
});
