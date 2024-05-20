export interface Article {
    id: number;
    title: string;
    thumbnail: string;
    sport: {
      id: number;
      name: string;
    };
    date: string;
    summary: string;
    content: string;
    teams: {
      id: number;
      name: string;
    }[];
}