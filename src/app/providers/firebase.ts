import * as FirebaseApp from "firebase/app";
import * as Constants from "src/constants";

// Firestore initialization
export const secondaryApp = FirebaseApp.initializeApp(
  Constants.FIREBASE_CONFIG
);
