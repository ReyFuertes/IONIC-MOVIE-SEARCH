export interface IResponse {
  Search?: any[];
  totalResults?: string;
  Response?: string;
}

export interface IMovie {
  Title?: string;
  Year?: number;
  Type?: string;
  imdbID?: string;
  Poster?: string;
}