import ContactFormSection from "@/components/user/contactUs/ContactFormSection";
import ContactHeroSection from "@/components/user/contactUs/ContactHeroSection";
import ContactInfoBar from "@/components/user/contactUs/ContactInfoSection";
import MapSection from "@/components/user/contactUs/LocationMapSection";

const ContactPage = () => {
  return (
    <main className="  ">
     <ContactHeroSection />
      <ContactInfoBar />
      <ContactFormSection />
      <MapSection />
    </main>
  );
};

export default ContactPage;
