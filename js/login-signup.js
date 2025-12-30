document.addEventListener("DOMContentLoaded", () => {

  const signupDialog = document.getElementById("signup-dialog");
  if (!signupDialog) return;

  const signupForm = signupDialog.querySelector("form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ Correct selectors
    const username = signupForm.querySelector('input[type="text"]:nth-of-type(1)').value.trim();
    const email = signupForm.querySelector('input[type="text"]:nth-of-type(2)').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value.trim();
    const mobile = signupForm.querySelector('input[placeholder="Mobile Number"]').value.trim();
    const gender = signupForm.querySelector("select").value;

    console.log("Signup data:", { username, email, password, mobile, gender });

    // ✅ Validation
    if (!username || !email || !password || !mobile || !gender) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://divine-sarthi.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password,
            mobile,
            gender
          })
        }
      );

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok && data.success) {
        alert("Signup successful! Please login.");
        signupForm.reset();
        $.magnificPopup.close(); // popup close
      } else {
        alert(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error");
    }
  });

});
