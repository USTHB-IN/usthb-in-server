import * as firebase from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCauKkJb7pwZbq8G6M881wbmFl5c4jd-WQ",
  authDomain: "usthb-in.firebaseapp.com",
  projectId: "usthb-in",
  storageBucket: "usthb-in.appspot.com",
  messagingSenderId: "239445397200",
  appId: "1:239445397200:web:ad9b3c60cc52ed8fdcd8d5",
};

// Initialize Firebase app
firebase.initializeApp({
  apiKey: "AIzaSyCauKkJb7pwZbq8G6M881wbmFl5c4jd-WQ",
  authDomain: "usthb-in.firebaseapp.com",
  projectId: "usthb-in",
  storageBucket: "usthb-in.appspot.com",
  messagingSenderId: "239445397200",
  appId: "1:239445397200:web:ad9b3c60cc52ed8fdcd8d5",
});

const storage = getStorage();

/**
 * Saves a file to Firebase Storage.
 * @param file The file to be saved.
 * @param destinationPath The destination path within the Firebase Storage bucket.
 * @returns Promise<string> The public URL of the saved file.
 */
export async function saveFileToStorage(
  file: Express.Multer.File,
  destinationPath: string
): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const storageRef = ref(storage, `${destinationPath}/${file.originalname}`);

    const uploadFile = await uploadString(storageRef, file.path);

    const fileUrl = await getDownloadURL(uploadFile.ref);

    resolve(fileUrl);
  });
}
const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
