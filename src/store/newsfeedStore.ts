import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { Unsubscribe, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";

let unsubFeed: Unsubscribe | null = null;
const store = (set: any) => ({
  userPostList: [],
  isLoggedIn: false,
  stateChanged: () => {
    onAuthStateChanged(auth, (redireting) => {
      if (redireting !== null) {
        console.log("True");
        set({ isLoggedIn: true });
      } else {
        console.log("Falsy");
        set({ isLoggedIn: false });
      }
    });
  },
  addUserFeed: async (getPost: { post: string }, dates: number) => {
    const getData = JSON.parse(localStorage.getItem("profile") || "{}");
    const dataParsed = {
      ...getData,
      createdAt: dates,
      ...getPost,
    };
    const userListRef = collection(db, "newsfeedPosts");
    try {
      set({ userPostList: [] });
      await addDoc(userListRef, dataParsed);
    } catch (err) {
      console.error(err);
    }
  },
  onSnapFeed: async () => {
    const userListRef = collection(db, "newsfeedPosts");
    unsubFeed = onSnapshot(userListRef, (snapshot) => {
      snapshot.docs.map((maps) => {
        const dataFeed = {
          ...maps.data(),
          id: maps.id,
        };
        set((state: any) => ({
          userPostList: [...state.userPostList, dataFeed],
        }));
      });
    });
  },
  offSnapFeed: () => {
    if (unsubFeed) {
      unsubFeed(), (unsubFeed = null);
    }
  },
});

export const useNewsFeedStore = create(store);
