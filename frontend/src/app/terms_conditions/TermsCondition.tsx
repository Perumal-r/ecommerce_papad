export default function TermsAndConditions() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. General</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Product Availability:</strong> Papad products may change without notice. We reserve the right to modify or discontinue products.</li>
          <li><strong>Price Fluctuations:</strong> Prices may vary due to raw material costs and market factors.</li>
          <li><strong>Legal Compliance:</strong> We comply with FSSAI, MSME, GST, and other applicable laws.</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Payment and Delivery</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Payment Methods:</strong> Accepted methods include UPI, Net Banking, Cards, etc. Any fees will be communicated at checkout.</li>
          <li><strong>Delivery Timeframes:</strong> Delivery estimates will be provided. Delays may occur due to unforeseen events.</li>
          <li><strong>Shipping Costs:</strong> Calculated based on the shipping location and shown during checkout.</li>
          <li><strong>Risk of Loss:</strong> Responsibility for goods passes to the customer when handed over to the courier.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Returns and Exchanges</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Return Policy:</strong> Returns accepted within 7 days of delivery. Products must be unused and in original condition. Shipping fees may apply.</li>
          <li><strong>Damaged or Defective Products:</strong> Contact us with images within 48 hours of receipt to request replacement or refund.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Copyright:</strong> All website content including text, images, and logos are protected.</li>
          <li><strong>Trademark:</strong> Unauthorized use of trademarks is strictly prohibited.</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Other Important Terms</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Privacy:</strong> Customer data is handled per our privacy policy.</li>
          <li><strong>Electronic Communications:</strong> By using our site, you agree to receive updates and notices electronically.</li>
          <li><strong>Website Use:</strong> We may update our terms at any time, with or without notice.</li>
          <li><strong>Disclaimer:</strong> We strive for accuracy, but do not guarantee all information is always current or error-free.</li>
        </ul>
      </section>

      <p className="text-sm text-gray-500 mt-6">Last updated: May 2025</p>
    </div>
  );
}
