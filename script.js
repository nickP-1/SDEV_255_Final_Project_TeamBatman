// hardwired user credentials //

const users = [
  {
    username: "a",
    password: "a",
  },
  {
    username: "student456",
    password: "password456",
  },
  {
    username: "admin",
    password: "admin123",
  },
];

// Get the login form and message elements//

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const validUser = users.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (validUser) {
    loginMessage.textContent = "Login successful!";
    loginMessage.style.color = "green";

    // Send the user to the dashboard//
    window.location.href = "courseHub.html";
  } else {
    loginMessage.textContent = "Incorrect username or password.";
    loginMessage.style.color = "red";
  }
});
