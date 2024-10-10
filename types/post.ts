interface Post {
  title: string;
  category: string;
  blocks: {
    type: 'markdown';
    content: string;
  }[];
  timestamp: number;
}
