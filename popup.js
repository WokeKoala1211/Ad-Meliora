// Show popup
document.getElementById("enterBtn").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("hidden");
});

// Handle phone submission
document.getElementById("popupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const phone = document.getElementById("popupPhone").value.trim();
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const response = await fetch("https://admeliora-notify-backend.onrender.com/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleaned })
    });

    if (response.ok) {
        document.getElementById("popupConfirm").classList.remove("hidden");

        setTimeout(() => {
            window.location.href = "drop.html";
        }, 1500);
    } else {
        alert("Error saving your number. Try again.");
    }
});
