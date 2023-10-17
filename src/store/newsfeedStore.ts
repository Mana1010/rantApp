import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { Unsubscribe, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { doc, collection } from "firebase/firestore";

let unsub: Unsubscribe | null = null;
const store = (set: any) => ({
  dataList: [],
  userPostList: [],
  updatedDataList: [],
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
  addDocs: async (info: { username: string }, imgOfficial: string) => {
    const profileInfo = {
      username: info.username,
      img: imgOfficial,
    };
    const profileRef = collection(db, "profile");
    try {
      await addDoc(profileRef, profileInfo);
    } catch (err) {
      console.error(err);
    }
  },
  onSnap: async () => {
    const profileRef = collection(db, "profile");
    unsub = onSnapshot(profileRef, (snapshot) => {
      snapshot.docs.map((mapping) => {
        const data = {
          ...mapping.data(),
          ids: mapping.id,
        };
        set((state: any) => ({ dataList: [...state.dataList, data] }));
      });
    });
  },
  offSnap: async () => {
    if (unsub) {
      unsub();
      unsub = null;
    }
  },
  addUserFeed: async () => {
    const getData: string = JSON.parse(
      localStorage.getItem("profile") as string
    );
    const userListRef = collection(db, "newsfeedPosts");
  },
});
export const useNewsFeedStore = create(store);
