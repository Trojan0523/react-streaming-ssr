declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '../styles/modules/skeleton.module.scss' {
  const content: {
    skeletonMain: string;
    skeletonNavbar: string;
    skeletonSidebar: string;
    skeletonPost: string;
    skeletonComments: string;
    skeletonTitle: string;
    skeletonLinks: string;
    skeletonLink: string;
    skeletonMenu: string;
    skeletonMenuItem: string;
    skeletonPostTitle: string;
    skeletonPostContent: string;
    skeletonLine: string;
    skeletonCommentsTitle: string;
    skeletonComment: string;
    skeletonCommentAuthor: string;
    skeletonCommentText: string;
  };
  export default content;
} 