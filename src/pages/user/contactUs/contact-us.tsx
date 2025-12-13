import ContactFormSection from "@/components/user/contactUs/ContactFormSection";
import ContactHeroSection from "@/components/user/contactUs/ContactHeroSection";
import ContactInfoBar from "@/components/user/contactUs/ContactInfoSection";
import MapSection from "@/components/user/contactUs/LocationMapSection";

const ContactPage = () => {
  return (
    <main className="  ">
     <ContactHeroSection />
      <MapSection />
      <ContactInfoBar />
      <ContactFormSection />
    </main>
  );
};

export default ContactPage;
