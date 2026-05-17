export type ReviewCardProps = {
  id?: number;
  category?: string;
  header: {
    username: string;
    badge: string;
    date: string;
  };
  score: {
    rating: number;
  };
  content: {
    text: string;
  };
  footer: {
    likes: number;
    deslikes: number;
  };
};
