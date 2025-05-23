// components/HowItWorks.js
import React from 'react';
import { FaHeart, FaTruck, FaUtensils } from 'react-icons/fa';

const HowItWorks = () => {
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">HOW IT WORKS</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Choose Your Favorite</h3>
            <p className="text-gray-600">
              Choose your favorite papad and order online or by website. It&apos;s easy to customize your order.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaTruck className="text-green-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">We Deliver Your Papad</h3>
            <p className="text-gray-600">
              We prepared and delivered papad arrive at your door. In a right time and at a right place.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FaUtensils className="text-orange-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Eat And Enjoy</h3>
            <p className="text-gray-600">
              No shopping, no cooking, no counting and no cleaning. Enjoy your healthy papads with your family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;