import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className=" text-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">LET'S CONNECT</h2>

        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Office */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-gray-700 mb-2" />
            <h4 className="font-bold">OUR MAIN OFFICE</h4>
            <p className="text-sm mt-1">
              37/A North Street Annupanadi, Madurai - 625009, India
            </p>
          </div>
          {/* Phone */}
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-3xl text-gray-700 mb-2" />
            <h4 className="font-bold">PHONE NUMBER</h4>
            <p className="text-sm mt-1">6369890217</p>
          </div>
          {/* Fax */}
          <div className="flex flex-col items-center">
            <FaFax className="text-3xl text-gray-700 mb-2" />
            <h4 className="font-bold">FAX</h4>
            <p className="text-sm mt-1">1-234-567-8900</p>
          </div>
          {/* Mail */}
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-gray-700 mb-2" />
            <h4 className="font-bold">MAIL</h4>
            <p className="text-sm mt-1">perumalavinash210@gmail.com</p>
          </div>
        </div>

        {/* Form & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="text-left mt-10">
            <h3 className="text-xl font-bold mb-1">
              GET A FREE CASE EVALUATION TODAY!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              AVAILABLE 8 HOURS A DAY!
            </p>
            <div>
           <strong>Company Name:</strong><span> Sri Priya Papad</span>
           </div>
           <div className="mt-2">
           <strong>Contact Person:</strong><span> Mr. RAMU N</span>
           </div>
           <div className="mt-2">
           <strong>Email:</strong><span> perumalavinash210@gmail.com</span>
          </div>
           <div className="mt-2">
           <strong>Phone:</strong><span> 6369890217</span>
          </div>
          <div className="mt-2">
            <strong>Address:</strong><span> 37/A North Street Annupanadi, Madurai - 625009, India</span>
          </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-bold mb-1">WE ARE HERE</h4>
            <p className="text-sm text-gray-600 mb-4">
              MON-SAT 8:30AM - 5PM / PHONES ARE OPEN
            </p>
            <iframe
              title="Madurai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.0!2d78.121719!3d9.939093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5a2e5f3e5e3%3A0x123456789abcdef0!2sMadurai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1620700100000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
