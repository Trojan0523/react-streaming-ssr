import React, { Suspense } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Post from './Post';
import Comments from './Comments';
import Spinner from './Spinner';
import '../styles/Layout.css';

// Layout component that implements the structure shown in the image
const Layout: React.FC = () => {
  return (
    <main>
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
