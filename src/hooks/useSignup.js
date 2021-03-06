import { useState, useEffect } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // get the uid of the user to create user image folder
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      // upload image to firebase storage
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      // extract the photo URL
      const photoURL = await img.ref.getDownloadURL();
      // add display name & photo to user
      await res.user.updateProfile({ displayName, photoURL });

      // create a user document & upload to firestore.
      // associate doc id with user id.
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
