interface Post {
  title: string;
  category: string;
  series: string;
  blocks: {
    type: 'markdown';
    content: string;
  }[];
  timestamp: number;
  lastUpdated: number;
  thumbnailImageSrc: string;
  commentsCount: number;
  id?: string;
  tags?: string[];
}
