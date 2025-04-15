import React from 'react';

const Post: React.FC = () => {
  return (
    <article>
      <h1>Main Content</h1>
      <div className="post-content">
        <p>Hello world! This is the main content that loads immediately.</p>
        <p>This content is instantly available because it's not wrapped in a Suspense boundary.</p>
        <p>Unlike the comments section below, which will show a loading spinner until data is ready.</p>
      </div>
    </article>
  );
};

export default Post;
