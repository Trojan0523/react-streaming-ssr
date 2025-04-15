import React from 'react';

const Post: React.FC = () => {
  return (
    <article className="bg-white p-5 rounded-lg shadow-sm" style={{ gridArea: 'content' }}>
      <h1 className="text-xl font-bold text-gray-800">Main Content</h1>
      <div className="leading-relaxed mt-3">
        <p className="mb-3">Hello world! This is the main content that loads immediately.</p>
        <p className="mb-3">This content is instantly available because it's not wrapped in a Suspense boundary.</p>
        <p className="mb-3">Unlike the comments section below, which will show a loading spinner until data is ready.</p>
      </div>
    </article>
  );
};

export default Post;
