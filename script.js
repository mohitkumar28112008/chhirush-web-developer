
// CHHIRUSH WEB DEVELOPER
// WEBSITE JAVASCRIPT

// MOBILE MENU

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", function () {

  const isOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.textContent = isOpen ? "✕" : "☰";

});

// CLOSE MENU AFTER CLICK

document.querySelectorAll(".nav-links a").forEach(function(link) {

  link.addEventListener("click", function() {

    navLinks.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.textContent = "☰";

  });

});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// WHATSAPP ENQUIRY FORM

document.getElementById("contactForm").addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    const name = document
      .getElementById("clientName")
      .value.trim();

    const business = document
      .getElementById("businessName")
      .value.trim();

    const websiteType = document
      .getElementById("websiteType")
      .value;

    const details = document
      .getElementById("projectDetails")
      .value.trim();

    if (!name || !business || !details) {

      alert("Please fill all required fields.");

      return;

    }

    const message = [
      "Hello Chhirush Web Developer!",
      "",
      "I want to develop a website.",
      "",
      "Name: " + name,
      "Business: " + business,
      "Website Type: " + websiteType,
      "Requirements: " + details,
      "",
      "Please share the next steps."
    ].join("\n");

    // CHANGE THIS NUMBER IF REQUIRED
    // Use country code 91 without + or spaces.

    const whatsappNumber = "919116102041";

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    // Opens WhatsApp with a pre-filled enquiry.
    // The customer must press Send.

    window.location.href = whatsappURL;

  }
);
