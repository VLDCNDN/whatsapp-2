import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import firebase from "firebase/app";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { updateDoc, serverTimestamp, collection, addDoc, doc, setDoc  } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = await setDoc(doc(db, "users", user.uid), {
            email : user.email,
            photoURL : user.photoURL,
            lastSeen: serverTimestamp(),
          })

          console.info("Document written", docRef);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData().catch(console.error);
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
