// ===============================
// Firebase INIT
// ===============================

// NOTE: Firebase config ko environment variables ya Firebase Hosting config mein rakhna
// best practice hai. Is file ko .gitignore mein add karo agar GitHub use kar rahe ho.

const firebaseConfig = {
  apiKey: "AIzaSyBEdZZ1F6Jvd--rmMf24QBPJl6ZOYyz9b8",
  authDomain: "jnvalumini-42fe7.firebaseapp.com",
  projectId: "jnvalumini-42fe7"
};

// Initialize ONLY ONCE
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();

// Global access (needed by other pages)
window.auth = auth;
window.db   = db;

// ===============================
// TOAST NOTIFICATION
// (alert() ki jagah — clean UI)
// ===============================

function showToast(message, type = "info") {
  // Remove existing toast
  const existing = document.getElementById("jnv-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "jnv-toast";

  const colors = {
    success: "#22c55e",
    error:   "#ef4444",
    info:    "#1e88e5",
    warning: "#f59e0b"
  };

  Object.assign(toast.style, {
    position:     "fixed",
    bottom:       "30px",
    right:        "30px",
    background:   colors[type] || colors.info,
    color:        "#fff",
    padding:      "14px 22px",
    borderRadius: "12px",
    fontSize:     "0.95rem",
    fontFamily:   "'Poppins', sans-serif",
    fontWeight:   "500",
    boxShadow:    "0 8px 25px rgba(0,0,0,0.2)",
    zIndex:       "99999",
    maxWidth:     "320px",
    lineHeight:   "1.5",
    opacity:      "0",
    transform:    "translateY(20px)",
    transition:   "all 0.3s ease"
  });

  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity   = "1";
    toast.style.transform = "translateY(0)";
  });

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity   = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ===============================
// BUTTON LOADING STATE
// ===============================

function setButtonLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  if (loading) {
    btn.disabled             = true;
    btn.dataset.originalText = btn.textContent;
    btn.textContent          = "Please wait...";
    btn.style.opacity        = "0.7";
    btn.style.cursor         = "not-allowed";
  } else {
    btn.disabled      = false;
    btn.textContent   = btn.dataset.originalText || btn.textContent;
    btn.style.opacity = "1";
    btn.style.cursor  = "pointer";
  }
}

// ===============================
// PASSWORD VALIDATION
// ===============================

function validatePassword(password) {
  if (password.length < 8) {
    return "Password kam se kam 8 characters ka hona chahiye.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password mein kam se kam ek capital letter honi chahiye.";
  }
  if (!/[0-9]/.test(password)) {
    return "Password mein kam se kam ek number hona chahiye.";
  }
  return null; // valid
}

// ===============================
// SIGNUP
// ===============================

async function signup() {
  const emailEl    = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const roleEl     = document.getElementById("role");

  if (!emailEl || !passwordEl || !roleEl) return;

  const email    = emailEl.value.trim();
  const password = passwordEl.value;
  const role     = roleEl.value;

  // Validation
  if (!email || !password) {
    showToast("Email aur password required hain.", "warning");
    return;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    showToast(passwordError, "warning");
    return;
  }

  setButtonLoading("signupBtn", true);

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user           = userCredential.user;

    // Send email verification
    await user.sendEmailVerification();

    const alumniId = "ALM-" + Math.floor(10000 + Math.random() * 90000);

    await db.collection("users").doc(user.uid).set({
      email,
      role,
      status:    "pending",
      alumniId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast(`Signup successful! 🎉 Your ID: ${alumniId}. Please verify your email.`, "success");

    // Reset form
    document.getElementById("email").value    = "";
    document.getElementById("password").value = "";

  } catch (err) {
    const msg = getFirebaseErrorMessage(err.code);
    showToast(msg, "error");
  } finally {
    setButtonLoading("signupBtn", false);
  }
}

// ===============================
// LOGIN
// ===============================

async function login() {
  const emailEl    = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  if (!emailEl || !passwordEl) return;

  const email    = emailEl.value.trim();
  const password = passwordEl.value;

  if (!email || !password) {
    showToast("Email aur password enter karein.", "warning");
    return;
  }

  setButtonLoading("loginBtn", true);

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user           = userCredential.user;

    // Email verification check
    if (!user.emailVerified) {
      showToast("Pehle apna email verify karein. Verification email bheja gaya hai.", "warning");
      await user.sendEmailVerification();
      await auth.signOut();
      return;
    }

    const docSnap = await db.collection("users").doc(user.uid).get();

    if (!docSnap.exists) {
      showToast("User data nahi mila. Admin se contact karein.", "error");
      await auth.signOut();
      return;
    }

    const data = docSnap.data();

    if (data.status !== "approved") {
      showToast("Aapka account abhi admin se approve nahi hua hai.", "warning");
      await auth.signOut();
      return;
    }

    // Store minimal, non-sensitive info
    sessionStorage.setItem("alumniId", data.alumniId);
    sessionStorage.setItem("userRole", data.role);

    showToast("Login successful! Redirect ho rahe hain...", "success");

    setTimeout(() => {
      if (data.role === "admin") {
        window.location.href = "admin/dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 1000);

  } catch (err) {
    const msg = getFirebaseErrorMessage(err.code);
    showToast(msg, "error");
  } finally {
    setButtonLoading("loginBtn", false);
  }
}

// ===============================
// AUTH STATE OBSERVER
// (Already logged in to redirect)
// ===============================

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  // Agar already login page pe hain aur logged in hain
  const isLoginPage = window.location.pathname.includes("login") ||
                      window.location.pathname.includes("signup");

  if (isLoginPage && user.emailVerified) {
    try {
      const docSnap = await db.collection("users").doc(user.uid).get();
      if (docSnap.exists && docSnap.data().status === "approved") {
        const role = docSnap.data().role;
        window.location.href = role === "admin" ? "admin/dashboard.html" : "dashboard.html";
      }
    } catch (e) {
      // silently ignore
    }
  }
});

// ===============================
// FIREBASE ERROR MESSAGES
// (User-friendly Hindi/English)
// ===============================

function getFirebaseErrorMessage(code) {
  const errors = {
    "auth/email-already-in-use":    "Yeh email already registered hai.",
    "auth/invalid-email":           "Email format sahi nahi hai.",
    "auth/weak-password":           "Password zyada strong chahiye (8+ characters).",
    "auth/user-not-found":          "Yeh email registered nahi hai.",
    "auth/wrong-password":          "Password galat hai.",
    "auth/too-many-requests":       "Bahut zyada attempts. Thodi der baad try karein.",
    "auth/network-request-failed":  "Network error. Internet connection check karein.",
    "auth/user-disabled":           "Yeh account disable kar diya gaya hai."
  };
  return errors[code] || "Kuch error hua. Dobara try karein.";
}

// ===============================
// CONTACT FORM
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // ID se fields access karo — index se nahi
      const name    = document.getElementById("contactName")?.value.trim();
      const email   = document.getElementById("contactEmail")?.value.trim();
      const batch   = document.getElementById("contactBatch")?.value.trim() || "";
      const message = document.getElementById("contactMessage")?.value.trim();

      if (!name || !email || !message) {
        showToast("Name, email aur message required hain.", "warning");
        return;
      }

      // Basic email check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Valid email address enter karein.", "warning");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled    = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        await db.collection("messages").add({
          name,
          email,
          batch,
          message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast("Message successfully bheja gaya! ✔", "success");
        form.reset();

      } catch (err) {
        showToast("Message send nahi hua: " + err.message, "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = "Send Message";
        }
      }
    });
  }

});