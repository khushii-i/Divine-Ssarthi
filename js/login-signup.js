document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#login-dialog form");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="text"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();
    const rememberMe = document.getElementById("ast_remember_me").checked;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://divine-sarthi.vercel.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          remember_me: rememberMe
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        // token save example
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.querySelector("#signup-dialog form");

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = signupForm.querySelectorAll("input, select");

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value.trim();
    const mobile = inputs[3].value.trim();
    const gender = inputs[4].value;

    if (!name || !email || !password || !mobile) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://divine-sarthi.vercel.app/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          gender: gender
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful. Please login.");
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  });
});
