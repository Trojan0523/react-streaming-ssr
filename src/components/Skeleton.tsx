/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 10:23:43
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 14:04:01
 * @Description: 请填写简介
 */
import styles from '../styles/modules/skeleton.module.scss';

// Skeleton components using SCSS modules
export const NavBarSkeleton = () => {
  return (
    <div className={styles.skeletonNavbar}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonLinks}>
        <div className={styles.skeletonLink}></div>
        <div className={styles.skeletonLink}></div>
        <div className={styles.skeletonLink}></div>
      </div>
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className={styles.skeletonSidebar}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonMenu}>
        <div className={styles.skeletonMenuItem}></div>
        <div className={styles.skeletonMenuItem}></div>
        <div className={styles.skeletonMenuItem}></div>
      </div>
    </div>
  );
};

export const PostSkeleton = () => {
  return (
    <div className={styles.skeletonPost}>
      <div className={styles.skeletonPostTitle}></div>
      <div className={styles.skeletonPostContent}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
    </div>
  );
};

export const CommentsSkeleton = () => {
  return (
    <div className={styles.skeletonComments}>
      <div className={styles.skeletonCommentsTitle}></div>
      <div className={styles.skeletonComment}>
        <div className={styles.skeletonCommentAuthor}></div>
        <div className={styles.skeletonCommentText}></div>
      </div>
      <div className={styles.skeletonComment}>
        <div className={styles.skeletonCommentAuthor}></div>
        <div className={styles.skeletonCommentText}></div>
      </div>
    </div>
  );
};

export const LayoutSkeleton = () => {
  return (
    <main className={styles.skeletonMain}>
      <NavBarSkeleton />
      <SidebarSkeleton />
      <PostSkeleton />
      <CommentsSkeleton />
    </main>
  );
}; 