const MapSection: React.FC = () => {
  return (
    <section className="w-full h-[400px]">
      <iframe
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d490.7199492054369!2d74.28737709805701!3d31.60951666987198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1755665098111!5m2!1sen!2s"
      ></iframe>
      
    </section>
  );
};

export default MapSection;
