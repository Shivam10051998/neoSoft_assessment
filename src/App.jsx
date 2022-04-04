import Rreact from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Box } from "@mui/material";
import store from './store';
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Box component="main">
                  <Rreact.Suspense fallback="Loading...">
                    <route.element />
                  </Rreact.Suspense>
                </Box>
              }
            />
          ))}
        </Routes>
      </Router>
      </Provider>
  );
}

export default App;
