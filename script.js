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
    // Set your drop date here
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
    setInterval(updateTimer, 60000); // Update every minute
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
