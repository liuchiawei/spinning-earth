export interface ListProps {
  id: number;
  name: string;
  description: string;
  url: string;
  location: string;
  lat: number;
  lng: number;
  label: string;
}

export interface ProductDataProps {
  productName: string;
  productImage: string;
  productDescription: string;
}

export interface LineChartDataProps {
  time: string;
  value: number;
}

export interface TimelineProps {
  year: string;
  title: string;
  content: string;
}

export interface CompanyProps {
  id: number;
  stringId: string;
  name: string;
  description: string;
  about: string;
  url: string;
  location: string;
  lat: number;
  lng: number;
  label: string;
  productName: string;
  productImage: string;
  productDescription: string;
  radarchart: number[];
  areachart: number[];
  googletrend: number[];
  timeline: {
    year: number;
    title: string;
    content: string;
  }[];
}
