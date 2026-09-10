import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header, type PublicPage } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

// Public Pages
import { HomeView } from "@/components/public/HomeView";
import { AboutView } from "@/components/public/AboutView";
import { AcademicsView } from "@/components/public/AcademicsView";
import { AcademicCalendarView } from "@/components/public/AcademicCalendarView";
import { AdmissionsView } from "@/components/public/AdmissionsView";
import { StudentLifeView } from "@/components/public/StudentLifeView";
import { NewsEventsView } from "@/components/public/NewsEventsView";
import { GalleryView } from "@/components/public/GalleryView";
import { ContactView } from "@/components/public/ContactView";
import { PortalLoginView } from "@/components/public/PortalLoginView";

// ERP Portal Shell
import { ErpPortalView } from "@/components/erp/ErpPortalView";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [inPortal, setInPortal] = useState(false);
  const [currentPage, setCurrentPage] = useState<PublicPage>("home");

  const handleNavigate = (page: PublicPage) => {
    setInPortal(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open the Portal Login / Demo gateway screen
  const handleOpenPortalLogin = () => {
    setInPortal(false);
    setCurrentPage("portal-login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enter the interactive ERP dashboard after role selection
  const handleEnterDashboard = () => {
    setInPortal(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Return to the public school website
  const handleBackToWebsite = () => {
    setInPortal(false);
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If in ERP Portal mode, render the ERP shell
  if (inPortal) {
    return (
      <ErpPortalView onBackToWebsite={handleBackToWebsite} onSwitchRole={handleOpenPortalLogin} />
    );
  }

  // Public School Website shell
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-gold/30 selection:text-navy-deep">
      {/* Header with navigation, theme toggle, and PORTAL LOGIN CTA */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPortal={handleOpenPortalLogin}
      />

      {/* Main Public Page Content */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomeView onNavigate={handleNavigate} onOpenPortal={handleOpenPortalLogin} />
        )}
        {currentPage === "about" && <AboutView onNavigate={handleNavigate} />}
        {currentPage === "academics" && <AcademicsView onNavigate={handleNavigate} />}
        {currentPage === "calendar" && (
          <AcademicCalendarView onNavigate={handleNavigate} onOpenPortal={handleOpenPortalLogin} />
        )}
        {currentPage === "admissions" && (
          <AdmissionsView onNavigate={handleNavigate} onOpenPortal={handleOpenPortalLogin} />
        )}
        {currentPage === "student-life" && <StudentLifeView onNavigate={handleNavigate} />}
        {currentPage === "news-events" && <NewsEventsView onNavigate={handleNavigate} />}
        {currentPage === "gallery" && <GalleryView onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactView onNavigate={handleNavigate} />}
        {currentPage === "portal-login" && (
          <PortalLoginView
            onEnterPortal={handleEnterDashboard}
            onBackToWebsite={handleBackToWebsite}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenPortal={handleOpenPortalLogin} />
    </div>
  );
}
