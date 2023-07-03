import React from 'react';

function Features() {
  return (
    <section className="py-20 px-4 md:px-0 dark:bg-gray-200">
      <div className="max-w-screen-xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-10 ">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Feature 1</h3>
            <p>Description of feature 1.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Feature 2</h3>
            <p>Description of feature 2.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Feature 3</h3>
            <p>Description of feature 3.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
