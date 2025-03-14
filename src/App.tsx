import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [minimized, setMinimized] = useState(false);

  // Handle "View" button click event
  const handleViewDomain = () => {
    window.open('https://znz.sh', '_blank');
  };

  // Minimize banner
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <Layout>
      <Outlet />

      {/* Domain promotion floating component */}
      {showBanner && (
        <div className={`fixed bottom-0 right-0 z-40 transition-all duration-300 ease-in-out ${minimized ? 'w-16 h-16' : 'w-80 sm:w-96'}`}>
          {/* Minimized state */}
          {minimized ? (
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-tl-lg shadow-lg w-full h-full flex items-center justify-center cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="text-white font-bold text-lg rotate-45">Domain</div>
            </div>
          ) : (
            <div className="bg-white rounded-tl-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Title bar */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 flex justify-between items-center">
                <h3 className="text-white font-semibold">Premium Domain Recommendations</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleMinimize}
                    className="text-white hover:bg-blue-600 rounded p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setShowBanner(false)}
                    className="text-white hover:bg-blue-600 rounded p-1"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Content area */}
              <div className="p-4 bg-gradient-to-br from-white to-blue-50">
                <p className="text-sm text-gray-600 mb-3">Find the perfect domain for your online business</p>
                
                <div className="space-y-3">
                  <div 
                    className="bg-white border border-blue-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={handleViewDomain}
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg text-blue-600">znz.sh</div>
                      <div className="text-sm font-semibold text-blue-600">$xxxxx</div>
                    </div>
                    <p className="text-xs text-gray-500">Premium short domain</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg">wss.dev</div>
                      <div className="text-sm font-semibold text-blue-600">$xxxxx</div>
                    </div>
                    <p className="text-xs text-gray-500">Ideal WebSocket development domain</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg">zwi.me</div>
                      <div className="text-sm font-semibold text-blue-600">$xxxxx</div>
                    </div>
                    <p className="text-xs text-gray-500">Premium short domain</p>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md shadow-sm hover:from-blue-600 hover:to-cyan-600 focus:outline-none"
                    onClick={handleViewDomain}
                  >
                    View Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default App;
