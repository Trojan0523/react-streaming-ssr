import React from 'react';

// Simulates loading comments with a longer delay
let comments: Array<{ id: number; author: string; text: string }> | null = null;
let promise: Promise<void> | null = null;

function fetchComments() {
  if (comments !== null) {
    // Data already loaded
    return;
  }
  
  if (promise === null) {
    // Start fetching with a longer delay (5 seconds)
    promise = new Promise<void>((resolve) => {
      console.log('Starting to fetch comments...');
      
      setTimeout(() => {
        console.log('Comments fetched after 5 seconds delay');
        comments = [
          { id: 1, author: 'Jane Doe', text: 'This is amazing! I love how fast the initial page loads.' },
          { id: 2, author: 'John Smith', text: 'Great demo of React Suspense. The comments loaded after the main content.' },
          { id: 3, author: 'Alice Johnson', text: 'I noticed the spinner while waiting for comments to load. Nice UX!' },
          { id: 4, author: 'Bob Williams', text: 'That 5-second wait really shows how Suspense keeps the rest of the UI responsive!' }
        ];
        resolve();
      }, 1000); // Increased to 5 seconds
    });
  }
  
  // While loading, throw the promise to trigger Suspense
  throw promise;
}

const Comments: React.FC = () => {
  // This will throw a promise if data isn't ready, triggering Suspense
  fetchComments();
  
  return (
    <section className="bg-gray-50 p-5 rounded-lg shadow-sm" style={{ gridArea: 'comments' }}>
      <h2 className="text-lg font-bold text-gray-800">Comments</h2>
      <div className="mt-4">
        {comments!.map((comment) => (
          <div key={comment.id} className="bg-white p-4 mb-4 rounded-lg shadow-sm">
            <h4 className="m-0 mb-1 text-gray-800 font-bold">{comment.author}</h4>
            <p className="m-0 text-gray-600">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comments;
