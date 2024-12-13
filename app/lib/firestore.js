import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Firebase Firestore instance

// Funkcja do dodawania filmu do biblioteki
export const addToLibrary = async (userId, movie) => {
  try {
    // Sprawdzamy, czy film już istnieje w bibliotece
    const userLibraryRef = collection(db, "users", userId, "library");
    const snapshot = await getDocs(userLibraryRef);
    const movieExists = snapshot.docs.some(doc => doc.data().id === movie.id);

    if (!movieExists) {
      // Dodajemy film do kolekcji "library" użytkownika
      await addDoc(userLibraryRef, movie);
      console.log("Movie added to library!");
    } else {
      alert("Film już jest w bibliotece!");
    }
  } catch (error) {
    console.error("Error adding movie to library:", error);
  }
};
