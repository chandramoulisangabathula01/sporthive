export interface Team {
    id: number;
    name: string;
}
  
export interface Match {
    thumbnail: string;
    id: number;
    name: string;
    
    location: string;
    startsAt: string;
    endsAt: Date;
    sportName: string;
    isRunning: boolean;
    teams: Team[];
    score: { [teamName: string]: string };
    story: string;
}
