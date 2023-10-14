export interface Result {
  _id: string;
  id: string;
  primaryImage?: PrimaryImage;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: ReleaseYear;
  releaseDate?: ReleaseDate;
  rate?:Rate;
}

interface ReleaseDate {
  day?: any;
  month?: number;
  year: number;
  __typename: string;
}

interface ReleaseYear {
  year: number;
  endYear?: any;
  __typename: string;
}

interface TitleText {
  text?: string;
  __typename: string;
}

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

interface PrimaryImage {
  id: string;
  width: number;
  height: number;
  url?: string;
  caption: Caption;
  __typename: string;
}

interface Caption {
  plainText: string;
  __typename: string;
}

interface Rate {
  points?: number;
}
