import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/Auth/IsPrivate/IsPrivate";
import IsAnon from "./components/Auth/IsAnon/IsAnon";
// import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import Decks from "./pages/DecksPage/Decks";
import ListAllCardsForSpecificDeck from "./components/Cards/ListOfAllCardsForSpecificDeck/ListOfAllCardsForSpecificDeck";

function App() {

  return (
    <div className="App">
      <Navbar />
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/decks/:deckId" element={<ListAllCardsForSpecificDeck />} />
        {/* <Route path="/decks/:deckId/card" */}

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
    
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
