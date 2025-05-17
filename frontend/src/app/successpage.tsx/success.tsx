'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        {/* <CheckCircle size={60} className="text-green-500 mx-auto mb-4" /> */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Success!</h1>
        <p className="text-gray-600 mb-6">Your action was completed successfully.</p>

        <button
          onClick={handleButtonClick}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
