interface Post {
  title: string;
  category: string;
  series: string;
  blocks: {
    type: 'markdown';
    content: string;
  }[];
  timestamp: number;
  thumbnailImageSrc: string;
  id?: string;
}