/* Smooth Scroll from Landing to Hero */
function scrollToNext() {
    const hero = document.querySelector('.hero');
    window.scrollTo({
        top: hero.offsetTop,
        behavior: 'smooth'
    });
}

/* Modern Countdown Timer */
function startCountdown() {
    const dropDate = new Date("2026-07-21T18:35:00");

    function updateTimer() {
        const now = new Date();
        const diff = dropDate - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerText = "LIVE NOW";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        document.getElementById("countdown").innerText =
            `${days}D • ${hours}H • ${minutes}M`;
    }

    updateTimer();
    setInterval(updateTimer, 60000);
}

startCountdown();

/* Fade-in Scroll Animation */
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add('visible');
        }
    });
});

/* Phone Number Notification Submission */
let lastSubmitTime = 0;

document.getElementById("notifyForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const phone = document.getElementById("phoneInput").value.trim();
    const cleaned = phone.replace(/\D/g, "");

    // Validation
    if (cleaned.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Rate limiting
    const nowTime = Date.now();
    if (nowTime - lastSubmitTime < 5000) {
        alert("Please wait a moment before submitting again.");
        return;
    }
    lastSubmitTime = nowTime;

    // Loading animation
    const button = document.querySelector("#notifyForm button");
    button.disabled = true;
    button.innerText = "Sending...";

    const response = await fetch("https://admeliora-notify-backend.onrender.com/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned })
    });

    // Restore button
    button.disabled = false;
    button.innerText = "Notify Me";

    if (response.ok) {
        const msg = document.getElementById("confirmationMessage");
        msg.classList.add("visible");
    } else {
        alert("Error saving your number. Try again.");
    }
});
