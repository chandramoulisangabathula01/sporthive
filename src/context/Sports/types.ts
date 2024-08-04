export interface Sport {
    id: number;
    name: string;
  }
  
export interface Team {
    id: number;
    name: string;
    country: string;
    plays: string;
}
  
export  interface Article {
    id: number;
    title: string;
    summary: string;
    thumbnail: string;
    sport: {
      id: number;
      name: string;
    };
    date: string;
    content: string;
    teams: {
      id: number;
      name: string;
    }[];
}