// ЗАМЕНИ НА СВОИ ДАННЫЕ С FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

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