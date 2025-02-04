export interface CompanyProps {
  id: number;
  title: string;
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
  content: string;
}


