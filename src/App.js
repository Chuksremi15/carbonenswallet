import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";
import { toast, ToastContainer } from "react-toastify";

//css
import "react-toastify/dist/ReactToastify.css";

//hooks
import ScrollToTheTop from "./hooks/ScrollToTheTop";

// Redux
import { store } from "./features/store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <ScrollToTheTop />
        <>
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
