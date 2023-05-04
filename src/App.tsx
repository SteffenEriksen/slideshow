import { BrowserRouter, Route } from "react-router-dom";

import Slideshow from "./Scenes/Slideshow/Slideshow";
import Upload from "./Scenes/Upload/Upload";
// import Test from "./Scenes/Test/Test";
import Display from "./Scenes/Display/Display";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Route exact path="/" component={Display} />
          <Route path="/slide" component={Slideshow} />
          <Route path="/upload" component={Upload} />
          {/* <Route path="/test" component={Test} /> */}
          {/* <Route path="/display" component={Display} /> */}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
