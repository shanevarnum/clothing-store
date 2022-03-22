import { initializeApp } from  'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
}from 'firebase/firestore'


// Your web app's Firebase configuration. Note:its okay that API key is exposed here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcFz_OUVV6APmBlZjTTvfNVaxm1hgbNvs",
    authDomain: "tamarinhead.firebaseapp.com",
    projectId: "tamarinhead",
    storageBucket: "tamarinhead.appspot.com",
    messagingSenderId: "417571673665",
    appId: "1:417571673665:web:a96965a322256ebc3818c0",
    measurementId: "G-3M6F6BL5Z2"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  // to use Google auth we need to generate a provider
  const provider = new GoogleAuthProvider();
  
  // force user to select account to log in to
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }