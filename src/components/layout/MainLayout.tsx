import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = React.forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <Header />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }
);

MainLayout.displayName = "MainLayout";

export default MainLayout;
