import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {/* Global header */}
      <Header />
      {/* Top loading indicator */}
      <div aria-live="polite" aria-busy={isLoading}>
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 h-1 z-50">
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 animate-pulse" />
          </div>
        )}
      </div>
      {/* Page outlet */}
      <Outlet />
      {/* Global footer */}
      <Footer />
    </>
  );
}

export default App;
