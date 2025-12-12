import { Outlet } from "react-router-dom";
import { CustomCarousel } from "@/components/user/authCarousel/Carousel";
import "swiper/swiper-bundle.css";

export default function AuthLayout() {
  const carouselSlides = [
    {
      content: (
        <div className="text-center text-2xl  ">
          Slide 1 Content
        </div>
      ),
      title: "Your Command Center for Legal Documentation",
      description: "Review, refine, and lock in your probable cause affidavits with AI support built for law enforcement. SARGE helps you stay compliant and courtroom-ready, every time.",
    },
    {
      content: (
        <div className="text-center text-2xl  ">
          Slide 2 Content
        </div>
      ),
      title: "Start Your Affidavit, Your Way",
      description:
        "Import dictations from the SARGE mobile app, paste directly into a blank editor, or upload an existing file, three flexible ways to begin your report.",
    },
    {
      content: (
        <div className="text-center text-2xl  ">
          Slide 3 Content
        </div>
      ),
      title: "Smart Follow-Up Questioning",
      description:
        "SARGE automatically asks precise follow-up questions to fill in the gaps, clarify facts, and ensure your affidavit covers every required element.",
    },
    {
      content: (
        <div className="text-center text-2xl  ">
          Slide 4 Content
        </div>
      ),
      title: "AI-Generated Probable Cause Drafts",
      description:
        "Once answers are complete, SARGE compiles them into a full probable cause affidavit - clear, structured, and ready for your review.",
    },
    {
      content: (
        <div className="text-center text-2xl ">
          Slide 5 Content
        </div>
      ),
      title: "Edit with SARGE (AI Chat Mode)",
      description:
        "Chat directly with SARGE to refine language, add legal phrasing, or make factual edits, just like talking to an experienced report reviewer.",
    },
    {
      content: (
        <div className="text-center text-2xl ">
          Slide 6 Content
        </div>
      ),
      title: "Track, Approve & Log",
      description:
        "Keep every edit and revision in one place. Review your affidavit timeline, approve changes, and log the final version straight into records.",
    },
  ];

  return (
    <main className="w-full h-screen overflow-hidden">
      <div className="flex w-full h-full">
        {/* Carousel Section - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:flex flex-col justify-center items-center w-2/3 px-5 bg-gray-50">
          <CustomCarousel slides={carouselSlides} />
        </div>
        
        {/* Auth Form Section */}
        <div className="flex items-center justify-center w-full lg:w-1/3 border-l px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
