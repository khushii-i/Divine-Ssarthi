/* ---------- SIGNUP ---------- */

const signupDialog = document.getElementById("signup-dialog");

if (signupDialog) {
  const signupForm = signupDialog.querySelector("form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = signupForm.querySelector('input[placeholder="Name"]').value.trim();
    const email = signupForm.querySelector('input[placeholder="Email"]').value.trim();
    const password = signupForm.querySelector('input[placeholder="Password"]').value.trim();
    const mobile = signupForm.querySelector('input[placeholder="Mobile Number"]').value.trim();
    const gender = signupForm.querySelector("select").value;

    console.log("Data going to backend:", { name, email, password, mobile, gender });

    if (!name || !email || !password || !mobile) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://divine-sarthi.vercel.app/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, mobile, gender })
        }
      );

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        alert("Signup successful! Please login.");
        signupForm.reset();
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}
