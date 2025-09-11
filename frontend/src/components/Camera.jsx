import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ onCapture, isCapturing = false }) => {
  const webcamRef = useRef(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc && onCapture) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
          Camera Capture
        </h3>
        <p className="text-gray-600 text-lg">Position yourself in the center and capture the perfect shot</p>
      </div>
      
      {/* Camera Container */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden mx-auto shadow-2xl" 
           style={{ aspectRatio: '16/9', maxWidth: '800px', width: '100%' }}>
        
        {/* Webcam */}
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={() => setIsWebcamReady(true)}
          onUserMediaError={(error) => {
            console.error('Webcam error:', error);
            setIsWebcamReady(false);
          }}
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }} // Fix mirrored camera
          mirrored={false}
        />
        
        {/* Elegant Face Guide Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-72 h-96 border-2 border-white/30 rounded-full animate-pulse"></div>
            {/* Inner guide */}
            <div className="absolute inset-4 border-2 border-white/50 rounded-full border-dashed"></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>

        {/* Corner Frame Guides */}
        <div className="absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-white/60 rounded-tl-lg"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-white/60 rounded-tr-lg"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-white/60 rounded-bl-lg"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-white/60 rounded-br-lg"></div>
        
        {/* Enhanced Status Indicator */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 ${
            isWebcamReady 
              ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30' 
              : 'bg-red-500/20 text-red-100 border border-red-400/30'
          }`}>
            <div className={`w-3 h-3 rounded-full mr-3 transition-all duration-300 ${
              isWebcamReady ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-red-400 animate-pulse'
            }`}></div>
            {isWebcamReady ? 'Camera Active' : 'Initializing Camera...'}
          </div>
        </div>

        {/* Loading overlay */}
        {!isWebcamReady && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-white/80 font-medium">Setting up your camera...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Capture Button */}
      <div className="text-center mt-8">
        <button
          onClick={capture}
          disabled={!isWebcamReady || isCapturing}
          className={`group relative px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
            !isWebcamReady || isCapturing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          <div className="flex items-center justify-center">
            {isCapturing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Image...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capture Photo
              </>
            )}
          </div>
          
          {/* Button glow effect */}
          {!isCapturing && isWebcamReady && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity -z-10"></div>
          )}
        </button>
        
        {/* Help text */}
        <p className="text-gray-500 text-sm mt-4">
          Make sure you're well-lit and looking directly at the camera
        </p>
      </div>
    </div>
  );
};

export default Camera;