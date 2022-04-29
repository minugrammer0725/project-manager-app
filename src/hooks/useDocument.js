import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, seteError] = useState(null);

  // realtime data for a document.
  useEffect(() => {
    // get a document reference.
    const ref = projectFirestore.collection(collection).doc(id);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          // if the snapshot has any data, then it is valid.
          setDocument({
            ...snapshot.data(),
            id: snapshot.id,
          });
          seteError(null);
        } else {
          seteError("No such document exists...");
        }
      },
      (err) => {
        console.log(err.message);
        seteError("Failed to get document");
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
