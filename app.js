// Firebase Config

console.log("APP JS LOADED ✔");
const firebaseConfig = {
  apiKey: "AIzaSyBEdZZ1F6Jvd--rmMf24QBPJl6ZOYyz9b8",
  authDomain: "jnvalumini-42fe7.firebaseapp.com",
  projectId: "jnvalumini-42fe7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {

      let user = userCredential.user;

      // 🆔 UNIQUE ALUMNI ID GENERATE
      let alumniId = "ALM-" + Math.floor(10000 + Math.random() * 90000);

      db.collection("users").doc(user.uid).set({
        email: email,
        role: role,
        status: "pending",

        // 🔥 NEW FIELD
        alumniId: alumniId,

        createdAt: new Date()
      });

      alert("Signup successful! Your Alumni ID: " + alumniId);
    })
    .catch(error => alert(error.message));
}


function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(async userCredential => {

      let user = userCredential.user;

      let doc = await db.collection("users").doc(user.uid).get();
      let data = doc.data();

      // ❌ NOT APPROVED CHECK
      if (data.status !== "approved") {
        alert("Not approved by admin yet!");
        auth.signOut();
        return;
      }

      // 🧠 SAVE USER ID FOR PROFILE ACCESS
      localStorage.setItem("userUID", user.uid);
      localStorage.setItem("alumniId", data.alumniId);

      // 🔀 REDIRECT
      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }

    })
    .catch(error => alert(error.message));
}



//LOGIN HARSH
