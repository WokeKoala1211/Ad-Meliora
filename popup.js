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

    // PHONE VALIDATION
    if (type === "phone") {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        payload.phone = cleaned;
    }

    // EMAIL VALIDATION
    if (type === "email") {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!validEmail) {
            alert("Please enter a valid email address.");
            return;
        }
        payload.email = value;
    }

    // SEND TO BACKEND
    const response = await fetch("https://admeliora-notify-backend.onrender.com/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    // SUCCESS
    if (response.ok) {

        // Show checkmark animation
        document.getElementById("checkmark").classList.add("show");

        // Show confirmation text
        document.getElementById("popupConfirm").classList.remove("hidden");

        // Fade out popup and return to hero page
        setTimeout(() => {
            document.getElementById("popup").classList.add("hidden");
        }, 1500);

    } else {
        alert("Error saving your info. Try again.");
    }
});
