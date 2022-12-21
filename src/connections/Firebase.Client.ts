import admin from "firebase-admin";
import { firebaseConfig } from "../config/Firebase.config";
firebaseConfig;

export const executeFirebase = async () => {
  try {
    return await admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  } catch (err) {
    return null;
  }
};
