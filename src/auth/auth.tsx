import { redirect, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNewsFeedStore } from "../store/newsfeedStore";

export async function authen() {
  const { isLoggedIn } = useNewsFeedStore();
  if (isLoggedIn) {
    throw redirect("/newsfeed");
  } else {
    throw redirect("/login");
  }
}
