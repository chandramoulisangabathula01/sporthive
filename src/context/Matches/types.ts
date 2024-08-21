export interface Team {
    id: number;
    name: string;
    country: string;
    plays: string;
}


  
export interface Match {
    date(date: any, language: any): import("react").ReactNode | Iterable<import("react").ReactNode>;
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




