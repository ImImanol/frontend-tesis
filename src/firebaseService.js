import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBwX4GOk-1AaH6NVWsFlV9t17gVDGbc4uM",
  authDomain: "tesis-imagenes.firebaseapp.com",
  projectId: "tesis-imagenes",
  storageBucket: "tesis-imagenes.appspot.com",
  messagingSenderId: "398938224176",
  appId: "1:398938224176:web:bef45105735782f0285ff5",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getIconsFromFirebase = async () => {
  const iconsRef = ref(storage, "icons/");
  const iconList = await listAll(iconsRef);
  const iconUrls = await Promise.all(
    iconList.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return url;
    })
  );
  return iconUrls;
};
