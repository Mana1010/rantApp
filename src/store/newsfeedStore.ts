import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const store = (set: any) => ({
  isLoggedIn: false,
  stateChanged: () => {
    onAuthStateChanged(auth, (redireting) => {
      if (redireting) {
        set({ isLoggedIn: true });
      } else {
        set({ isLoggedIn: false });
      }
    });
  },
});
export const useNewsFeedStore = create(store);
