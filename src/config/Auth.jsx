import { useState } from "react";
import { auth ,googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword ,signInWithPopup,signOut } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  const SignInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }
  const LogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>

      <input placeholder='Email..'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input placeholder='password'
        type="password"
        onChange={(e) => setPassword(e.target.value)}

      />
      <button onClick={SignIn}>Sign In</button>
      <button onClick={SignInGoogle}>Sign In with google</button>
      <button onClick={LogOut}>Log Out</button>
    </div>
  )
}

export default Auth
