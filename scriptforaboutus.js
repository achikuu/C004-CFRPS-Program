function sendMail() {
  const parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_0gfhrfo", "template_60ii9be", parms)
    .then(() => {
      alert("Email sent successfully!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Email failed to send. Please check your network connection.");
    });
}
