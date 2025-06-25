export interface ContentItem {
  name: string;
  type: string;
  id: string;
  autors: Array<{ name: string; img: string }>;
  year: Array<{
    start: number;
    end?: number;
    status: "finished" | "ongoing";
  }>;
  seasons: number;
  synopsis: string;
  imdbID: string;
  rate: number;
  backgroundImage: string;
  cast: Array<{ name: string; id: string }>;
  content: Array<{
    season: number;
    episodes: Array<{
      numberEP: number;
      title: string;
      id: string;
      desc: string;
      minutes: number;
      img: string;
      status: "Online" | "Offline";
    }>;
  }>;
  genres: Array<{ name: string; id: string }>;
  trailer?: Array<{
    title: string;
    url: string;
    img: string;
  }>;
  audio?: Array<{
    name: string;
    id: string;
  }>;
  subtitle?: Array<{
    name: string;
    id: string;
  }>;
  tabs: Array<{ title: string }>;
}