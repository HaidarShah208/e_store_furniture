import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactInfoBar: React.FC = () => {
  return (
    <section className="w-full bg-indigo-100 py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-800">
        <div className="flex items-start gap-3">
          <MapPin className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">Address</h4>
            <p>Devstive HQ, Lahore, Pakistan</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">Phone</h4>
            <p>+92 335 4342880</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">Email</h4>
            <p>dev.soft.wicks@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="text-indigo-600" />
          <div>
            <h4 className="font-semibold">Hours</h4>
            <p>Mon–Sat: 10am – 6pm</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoBar;
