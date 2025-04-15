import React from 'react';
import '../styles/Skeleton.css';

export const NavBarSkeleton: React.FC = () => {
  return (
    <div className="skeleton-navbar">
      <div className="skeleton-title"></div>
      <div className="skeleton-links">
        <div className="skeleton-link"></div>
        <div className="skeleton-link"></div>
        <div className="skeleton-link"></div>
      </div>
    </div>
  );
};

export const SidebarSkeleton: React.FC = () => {
  return (
    <div className="skeleton-sidebar">
      <div className="skeleton-title"></div>
      <div className="skeleton-menu">
        <div className="skeleton-menu-item"></div>
        <div className="skeleton-menu-item"></div>
        <div className="skeleton-menu-item"></div>
      </div>
    </div>
  );
};

export const PostSkeleton: React.FC = () => {
  return (
    <div className="skeleton-post">
      <div className="skeleton-post-title"></div>
      <div className="skeleton-post-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};

export const CommentsSkeleton: React.FC = () => {
  return (
    <div className="skeleton-comments">
      <div className="skeleton-comments-title"></div>
      <div className="skeleton-comment">
        <div className="skeleton-comment-author"></div>
        <div className="skeleton-comment-text"></div>
      </div>
      <div className="skeleton-comment">
        <div className="skeleton-comment-author"></div>
        <div className="skeleton-comment-text"></div>
      </div>
    </div>
  );
};

export const LayoutSkeleton: React.FC = () => {
  return (
    <main className="skeleton-main">
      <NavBarSkeleton />
      <SidebarSkeleton />
      <PostSkeleton />
      <CommentsSkeleton />
    </main>
  );
}; 