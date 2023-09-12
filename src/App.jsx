// import "./App.css";
import "./Calendar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Everything from "./dev-components/Everything";
import AboutUs from "./routes/AboutUs";
import Home from "./routes/Home";
import ContactUs from "./routes/ContactUs";
import FrequentlyAskedQuestions from "./routes/FrequentlyAskedQuestions";
import Reviews from "./routes/Reviews";
import Header from "./components/Header";
import { UserProvider, AuthProvider } from "./contexts/context";
import RequestName from "./appointment-process/RequestName";
import PainCategory from "./appointment-process/PainCategory";
import TherapistPairing from "./appointment-process/TherapistPairing";

// w-fit
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <div className="mx-auto border rounded-lg shadow-md w-fit">
              <Header />
              <div className="p-4">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route path="faqs" element={<FrequentlyAskedQuestions />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="request-name" element={<RequestName />} />
                  <Route path="pain-category" element={<PainCategory />} />
                  <Route path="pairing" element={<TherapistPairing />} />
                  <Route path="dev" element={<Everything />} />
                </Routes>
              </div>
            </div>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
