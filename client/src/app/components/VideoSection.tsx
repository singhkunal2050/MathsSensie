import React from 'react';

function VideoSection() {
  return (
    <section className="bg-[#eaf2ff] dark:bg-gray-700 dark:text-white py-20 px-4 md:px-0">
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-10">Product Video</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/your-video-id"
            title="Product Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
