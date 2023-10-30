// import "./App.css";
import "./Calendar.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import Everything from "./dev-components/Everything";
import AboutUs from "./routes/AboutUs";
import Home from "./routes/Home";
import ContactUs from "./routes/ContactUs";
import FrequentlyAskedQuestions from "./routes/FrequentlyAskedQuestions";
import Reviews from "./routes/Reviews";
import Header from "./components/Header";
import { UserProvider, AuthProvider } from "./contexts/context";
import RequestName from "./routes/appointment-process/1_RequestName";
import SelectCategory from "./routes/appointment-process/2_SelectCategory";
import TherapistPairing from "./routes/appointment-process/3_TherapistPairing";
import Admin from "./routes/Admin";
import Footer from "./components/Footer";
import ContactInformation from "./routes/appointment-process/4_ContactInformation";
import Notes from "./routes/appointment-process/5_Notes";
import Login from "./routes/Login";
import Options from "./routes/Options";
import { AuthContext } from "./contexts/context";
import Services from "./routes/Services";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.auth;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <Routes>
              {/* <Route path="*" element={<Navigate to="login" replace />} /> */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <WSW>
                      <Home />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="about"
                element={
                  <PrivateRoute>
                    <WSW>
                      <AboutUs />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="contact"
                element={
                  <PrivateRoute>
                    <WSW>
                      <ContactUs />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="services"
                element={
                  <PrivateRoute>
                    <WSW>
                      <Services />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="faqs"
                element={
                  <PrivateRoute>
                    <WSW>
                      <FrequentlyAskedQuestions />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="reviews"
                element={
                  <PrivateRoute>
                    <WSW>
                      <Reviews />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="request-name"
                element={
                  <PrivateRoute>
                    <WSW>
                      <RequestName />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="category"
                element={
                  <PrivateRoute>
                    <WSW>
                      <SelectCategory />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="pairing"
                element={
                  <PrivateRoute>
                    <WSW>
                      <TherapistPairing />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="contact-information"
                element={
                  <PrivateRoute>
                    <WSW>
                      <ContactInformation />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="notes"
                element={
                  <PrivateRoute>
                    <WSW>
                      <Notes />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="dev"
                element={
                  <PrivateRoute>
                    <WSW>
                      <Everything />
                    </WSW>
                  </PrivateRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <PrivateRoute>
                    <APW>
                      <Admin />
                    </APW>
                  </PrivateRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PrivateRoute>
                    <LW>
                      <Login />
                    </LW>
                  </PrivateRoute>
                }
              />
              <Route
                path="options"
                element={
                  <PrivateRoute>
                    <LW>
                      <Options />
                    </LW>
                  </PrivateRoute>
                }
              />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

function WSW({ children }) {
  // WSW stands for WebSiteWrap, it is meant to wrap all the routes in the website.
  // I will make a different wrapper for the admin panel.
  return (
    <div className="p-1 min-h-screen h-screen w-screen">
      <div className="mx-auto border rounded-lg shadow-md">
        <Header />
        <div className="p-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

function APW({ children }) {
  // Admin Panel Wrap
  return (
    <div className="pt-2 pb-2 flex items-center">
      <div className="mx-auto border rounded-lg shadow-md w-fit">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function LW({ children }) {
  // Login Wrap
  return (
    <div className="bg-nss-20 h-screen w-screen flex items-center justify-center">
      <div className="bg-nss-21 mx-auto border rounded-lg shadow-md w-fit border-nss-1 ">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default App;
