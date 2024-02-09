import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";
import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

//css
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

//hooks
import ScrollToTheTop from "./hooks/ScrollToTheTop";

// Redux
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import { getWalletDetails } from "./features/onboarding/onboardingSlice.js";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <ScrollToTheTop />
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
        <Pages />
      </Router>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
