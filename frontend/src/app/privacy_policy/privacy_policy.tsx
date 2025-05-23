export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At FreshFields Papad, we value your privacy. This policy outlines how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information Collection</h2>
      <p className="mb-4">
        We collect personal data you provide during registration, order placement, or when contacting us. This may include your name, email address, phone number, and shipping details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of Information</h2>
      <p className="mb-4">
        Your information is used to process orders, respond to queries, and improve our services. We may also use it to send updates or promotional content with your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We use secure technologies and procedures to protect your data from unauthorized access or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to improve user experience. You can control cookie preferences through your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services (like payment gateways or analytics tools). These services may collect and use information as governed by their privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. Any changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="mb-4">
        For questions regarding our privacy practices, please contact us at:
        <br />
        Email: <a href="mailto:support@freshfieldspapad.com" className="text-green-700 hover:underline">support@freshfieldspapad.com</a>
      </p>

      <a
        href="/privacy-policy.pdf"
        download
        className="inline-block bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition duration-200 mt-6"
      >
        Download Privacy Policy (PDF)
      </a>
    </div>
  );
}
