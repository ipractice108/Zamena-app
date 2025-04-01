// ЗАМЕНИ НА СВОИ ДАННЫЕ С FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYxYCjWEPB631FEIWLBN1E11Mm96Dwks0",
  authDomain: "zamena-app.firebaseapp.com",
  projectId: "zamena-app",
  storageBucket: "zamena-app.firebasestorage.app",
  messagingSenderId: "493406741561",
  appId: "1:493406741561:web:df80dceb3ffe55378219e8",
  measurementId: "G-VMFBSKLD83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById('regForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const role = form[0].value;
  const email = form[6].value;
  const password = form[7].value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    const data = {
      uid,
      role,
      name: form[1].value,
      age: form[2].value,
      experience: form[3].value,
      practices: form[4].value,
      area: form[5].value,
      minPrice: form[6].value,
      email
    };

    await setDoc(doc(db, "users", uid), data);
    alert("Регистрация успешна!");
    form.reset();
  } catch (err) {
    alert("Ошибка: " + err.message);
  }
});
