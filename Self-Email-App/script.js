(function () {
    emailjs.init("ppb47uPpV5QnJcRSG"); // Your Public Key
})();

function showPopup(message, type) {
    let popup = document.getElementById("popup");
    popup.innerHTML = message;
    popup.className = "popup " + type;
    popup.style.display = "block";
    setTimeout(() => { popup.style.display = "none"; }, 2500);
}

function clearForm() {
    document.getElementById("userEmail").value = "";
    document.getElementById("message").value = "";
}

function sendMail() {
    let sendBtn = document.getElementById("sendBtn");
    let btnText = document.getElementById("btnText");
    let btnSpinner = document.getElementById("btnSpinner");

    // Show loading in button
    btnText.textContent = "Sending...";
    btnSpinner.style.display = "inline-block";
    sendBtn.disabled = true;

    let params = {
        to_email: document.getElementById("userEmail").value,
        message: document.getElementById("message").value,
        from_email: "talk.mdsalam@gmail.com"
    };

    emailjs.send("service_3zs2yc8", "template_1v9w2wj", params)
        .then(function (response) {
            btnText.textContent = "Send";
            btnSpinner.style.display = "none";
            sendBtn.disabled = false;
            showPopup("✅ Email sent successfully!", "success");
            clearForm(); // clear only on success
        }, function (error) {
            btnText.textContent = "Send";
            btnSpinner.style.display = "none";
            sendBtn.disabled = false;
            showPopup("❌ Failed to send email", "error");
            // keep inputs as they are
        });

    // Enter key event listener
    document.addEventListener("keydown", function (e) {
        const textarea = document.getElementById("message");
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            sendMail(); // trigger send
        }
    });

}
