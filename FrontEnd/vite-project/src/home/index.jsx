import Header from "@/components/custom/Header";
import LandingPage from "@/components/custom/LandingPage";
import { UserButton } from "@clerk/clerk-react"; // Remove unused imports if not needed
import React from "react";

function Home() {
  return (
    <div>
      <Header />
      <LandingPage />
    </div>
  );
}

export default Home;
