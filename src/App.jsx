import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.scss";

import { ModalProvider } from "./context/ModalContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import HomePage from "./home/Home";
import QuickView from "./pages/Insight/Insight";
import SupportPage from "./pages/Support/Support";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <ModalProvider>
        <main>
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout pageTitle="Home" additionalInfo="">
                    <HomePage />
                  </Layout>
                }
              />
              <Route
                path="/quickview"
                element={
                  <Layout pageTitle="Quick View" additionalInfo="">
                    <QuickView />
                  </Layout>
                }
              />
              <Route
                path="/support"
                element={
                  <Layout pageTitle="Support" additionalInfo="">
                    <SupportPage />
                  </Layout>
                }
              />
            </Routes>
          </DndProvider>
        </main>
      </ModalProvider>
    </Router>
  );
}

export default App;
