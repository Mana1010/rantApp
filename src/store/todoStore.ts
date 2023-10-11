import { create } from "zustand";
import {
  addDoc,
  collection,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Info } from "../TodoList";
import { storage } from "../config/firebase";
import { uploadBytes, ref, listAll, getDownloadURL } from "firebase/storage";
type Extends = {
  storageData:
    | {
        description: string;
        username: string;
        id: string;
      }[]
    | [];
  imageList: any;
  addDocs: (value: Info, imgUrl: File | null) => void;
  addImageList: () => void;
  onSnap: () => void;
  offSnap: () => void;
};
let unsub: Unsubscribe | null = null;
const useZustand = create<Extends>((set) => ({
  storageData: [],
  imageList: [],
  addDocs: async (values: Info, imgUrl: File | null) => {
    const collections = collection(db, "notes");
    const fileName = imgUrl?.name;
    const fileRef = ref(storage, `images/${fileName}`);
    try {
      await addDoc(collections, {
        username: values.username,
        description: values.description,
      });
      if (imgUrl === null) throw new Error("Please put photo on it");
      const snapshot = await uploadBytes(fileRef, imgUrl);
      const anotherSnapshot = await getDownloadURL(snapshot.ref);
      set((state) => ({
        imageList: [...state.imageList, anotherSnapshot],
      }));
    } catch (err) {
      console.log(err);
    }
  },
  addImageList: async () => {
    const reference = ref(storage, "images/");
    try {
      const listItem = await listAll(reference);
      const listMap = listItem.items.map(async (list) => {
        return await getDownloadURL(list);
      });
      const wait = await Promise.all(listMap);
      set((state) => ({
        imageList: wait,
      }));
      console.log(wait);
    } catch (err) {
      console.error(err);
    }
  },
  onSnap: () => {
    const collections = collection(db, "notes");
    unsub = onSnapshot(collections, (snapshot) => {
      const parsed = snapshot.docs;
      console.log("Added");
      const mapped = parsed.map((parse: any) => {
        return {
          ...parse.data(),
          id: parse.id,
        };
      });
      set({ storageData: mapped });
    });
  },
  offSnap: () => {
    if (unsub) {
      unsub();
      unsub = null;
    }
  },
}));
export default useZustand;
