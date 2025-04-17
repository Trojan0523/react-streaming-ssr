import React, { Suspense, useDeferredValue } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Post from './Post';
import Comments from './Comments';
import Spinner from './Spinner';

// Layout component that implements the structure shown in the image
const Layout: React.FC = () => {
  return (
    <main className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr_auto] gap-5 p-5 max-w-[1200px] mx-auto min-h-screen" style={{
      gridTemplateAreas: 
        '"nav nav" "sidebar content" "sidebar comments"'
    }}>
      <NavBar />
      <Sidebar />
      <Post />
      <Suspense fallback={<Spinner />}>
        <Comments />
      </Suspense>
    </main>
  );
};

export default Layout;
