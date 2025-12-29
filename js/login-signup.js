/* ===== LOGIN + SIGNUP (SAME PAGE, POPUP SAFE) ===== */

document.addEventListener("submit", async function (e) {

  /* ---------- LOGIN ---------- */
  if (e.target.closest("#login-dialog form")) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const password = form.querySelector('input[placeholder="Password"]').value.trim();
    const rememberMe = document.getElementById("ast_remember_me").checked;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://divine-sarthi.vercel.app/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember_me: rememberMe })
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  /* ---------- SIGNUP ---------- */
  if (e.target.closest("#signup-dialog form")) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('input[placeholder="Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const password = form.querySelector('input[placeholder="Password"]').value.trim();
    const mobile = form.querySelector('input[placeholder="Mobile Number"]').value.trim();
    const gender = form.querySelector("select").value;

    console.log("Signup data:", { name, email, password, mobile, gender });

    if (!name || !email || !password || !mobile) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://divine-sarthi.vercel.app/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, mobile, gender })
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        alert("Signup successful! Please login.");
        form.reset();
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

});
