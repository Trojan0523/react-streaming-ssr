/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 10:23:43
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 14:04:01
 * @Description: 请填写简介
 */
// @ts-ignore
import styles from '../styles/modules/skeleton.module.css';

// Creating skeleton components with inline styles to ensure width consistency with actual components

// Shared styles
const skeletonStyles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: '"nav nav" "sidebar content" "sidebar comments"',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    minWidth: '800px',
    margin: '0 auto',
    minHeight: '100vh'
  },
  component: {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box' as 'border-box'
  },
  pulseElement: {
    height: '16px',
    background: 'linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)',
    backgroundSize: '200px 100%',
    animation: 'skeleton-pulse 1.5s infinite',
    borderRadius: '4px',
    marginBottom: '10px',
    width: '100%'
  }
};

export const NavBarSkeleton = () => {
  return (
    <div style={{ ...skeletonStyles.component, gridArea: 'nav', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px' }}>
      <div style={{ ...skeletonStyles.pulseElement, height: '24px', width: '120px' }}></div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ ...skeletonStyles.pulseElement, width: '60px' }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '60px' }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '60px' }}></div>
      </div>
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div style={{ ...skeletonStyles.component, gridArea: 'sidebar' }}>
      <div style={{ ...skeletonStyles.pulseElement, height: '24px', width: '120px' }}></div>
      <div style={{ width: '100%', marginTop: '15px' }}>
        <div style={{ ...skeletonStyles.pulseElement, width: '85%' }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '85%' }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '85%' }}></div>
      </div>
    </div>
  );
};

export const PostSkeleton = () => {
  return (
    <div style={{ ...skeletonStyles.component, gridArea: 'content' }}>
      <div style={{ ...skeletonStyles.pulseElement, height: '28px', width: '70%', marginBottom: '20px' }}></div>
      <div style={{ width: '100%' }}>
        <div style={{ ...skeletonStyles.pulseElement }}></div>
        <div style={{ ...skeletonStyles.pulseElement }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '80%' }}></div>
      </div>
    </div>
  );
};

export const CommentsSkeleton = () => {
  return (
    <div style={{ ...skeletonStyles.component, gridArea: 'comments' }}>
      <div style={{ ...skeletonStyles.pulseElement, height: '24px', width: '120px', marginBottom: '20px' }}></div>
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px', width: '100%', boxSizing: 'border-box' as 'border-box' }}>
        <div style={{ ...skeletonStyles.pulseElement, height: '18px', width: '100px' }}></div>
        <div style={{ ...skeletonStyles.pulseElement }}></div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px', width: '100%', boxSizing: 'border-box' as 'border-box' }}>
        <div style={{ ...skeletonStyles.pulseElement, height: '18px', width: '100px' }}></div>
        <div style={{ ...skeletonStyles.pulseElement, width: '70%', marginBottom: '0' }}></div>
      </div>
    </div>
  );
};

export const LayoutSkeleton = () => {
  return (
    <main style={skeletonStyles.main}>
      <NavBarSkeleton />
      <SidebarSkeleton />
      <PostSkeleton />
      <CommentsSkeleton />
    </main>
  );
}; 