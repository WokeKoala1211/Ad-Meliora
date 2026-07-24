// Show popup
document.getElementById("enterBtn").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("hidden");
});

// Handle submission
document.getElementById("popupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.getElementById("contactType").value;
    const value = document.getElementById("popupInput").value.trim();

    let payload = {};

    if (type === "phone") {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        payload.phone = cleaned;
    }

    if (type === "email") {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!validEmail) {
            alert("Please enter a valid email address.");
            return;
        }
        payload.email = value;
    }

    const response = await fetch("https://admeliora-notify-backend.onrender.com/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        document.getElementById("checkmark").classList.add("show");
        document.getElementById("popupConfirm").classList.remove("hidden");

        setTimeout(() => {
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "drop.html";
            }, 600);
        }, 1500);
    } else {
        alert("Error saving your info. Try again.");
    }
});
