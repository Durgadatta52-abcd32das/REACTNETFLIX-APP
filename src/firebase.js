// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyB2becQmrd4qS0Ev3lwWqGv__FmrwUy4yw",
  authDomain: "netflix-clone-29476.firebaseapp.com",
  projectId: "netflix-clone-29476",
  storageBucket: "netflix-clone-29476.appspot.com",
  messagingSenderId: "974475344908",
  appId: "1:974475344908:web:bdcf0e816f48ae828e0229",
  measurementId: "G-6KWZ0Y510V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async(name , email , password)=>{

    try{

     const res = await createUserWithEmailAndPassword(auth,email, password);

     const user = res.user;

     await addDoc(collection(db, "user"), {

        uid:user.uid,

        name ,

        authProvider:"local",

        email,

     });

    }catch(error){

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async ()=>{

    try{

     await signInWithEmailAndPassword(auth, email , password);

    }catch(error){

        console.log(error);

        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout = ()=>{

    signOut(auth);
}


export{auth , db , login , signup, logout};