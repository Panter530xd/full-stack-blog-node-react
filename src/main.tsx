import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7eCoDJkbjlaWA-6o6vs-O-7jXyTTgRmU",
  authDomain: "react-blog-44bb0.firebaseapp.com",
  projectId: "react-blog-44bb0",
  storageBucket: "react-blog-44bb0.appspot.com",
  messagingSenderId: "422634856551",
  appId: "1:422634856551:web:5c6899f04a0f523ecdf4c2",
  // measurementId: "G-NR7K25DV91",
};

initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
