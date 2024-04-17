import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch (error){
            console.error(error)
        };
    };

    const SignInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }catch (error){
            console.error(error)
        };
    };

    const logout = async () => {
        try{
            await signOut(auth);
        }catch (error){
            console.error(error)
        };
    };
    
    return (
        <div>
           <input type="email" placeholder="email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" placeholder="password..." value={password} onChange={(e)=>setPassword(e.target.value)} />
           <button onClick={SignIn}>Sign in</button>
           <button onClick={SignInWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Log out</button>
        </div>
    );
};
