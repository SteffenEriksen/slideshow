import { BrowserRouter, Route } from "react-router-dom";

import { Upload } from "./Scenes/Upload/Upload";
import { Slideshow } from "./Scenes/Slideshow/Slideshow";
import { Display } from "./Scenes/Display/Display";
import { AppProvider } from "./store/AppContext";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Display} />
          <Route path="/slide" component={Slideshow} />
          <Route path="/upload" component={Upload} />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
