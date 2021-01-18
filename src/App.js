import React from "react";

import { Route } from "react-router-dom";
import Game from "./components/Game/Game";

function App() {
  return (
      <React.Fragment>
          <Route exact path="/" component={Game} />
      </React.Fragment>
  );
}

export default App;
