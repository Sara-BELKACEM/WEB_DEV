import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Accueil";
import { Provider } from "react-redux";
import { store } from "./Redux/store";


function App() {
  return (
   <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
