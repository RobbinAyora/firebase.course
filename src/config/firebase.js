
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA2_gGiI7Qd0SZHwQavHqHHys3dPDmW3G0",
  authDomain: "fir-course-fd91c.firebaseapp.com",
  projectId: "fir-course-fd91c",
  storageBucket: "fir-course-fd91c.appspot.com",
  messagingSenderId: "354683173738",
  appId: "1:354683173738:web:7c3ce29ce04a59e9224313",
  measurementId: "G-TRDZNC6Q70"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
