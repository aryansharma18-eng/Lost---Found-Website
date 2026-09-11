import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home Page/Home";
import Lost from "./components/Lost and Found Page/Lost";
import Found from "./components/Lost and Found Page/Found";
import Browse from "./components/Browse/Browse";
import ReportDetails from "./components/ReportDetails/ReportDetails";


function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<Lost />} />
            <Route path="/found" element={<Found />} />
            <Route path="/browse" element={<Browse />}/>
            <Route path="/browse/:type/:id" element={<ReportDetails />}/>
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;