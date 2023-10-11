import React, { useState } from "react";
import { storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
function Info() {
  const [avatar, setAvatar] = useState<File | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (avatar !== null) {
      const storages = ref(storage, `images/${avatar?.name}`);
      try {
        await uploadBytes(storages, avatar);
      } catch (error) {}
      return;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          placeholder="Inser an image"
          onChange={(e: any) => {
            if (e.target.files[0] !== null) {
              const file = e.target.files[0];
              setAvatar(file);
            }
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Info;
// function handleChange(e: React.ChangeEvent<HTMLInputElement> | null) {
//   const file = e.target.files[0].name;
//   console.log(file);
// }
