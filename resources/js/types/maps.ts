interface PinProps {
  long: number;
  lat: number;
  message: string;
}

interface iterateData {
  display_name: string;
  latitude: number;
  longitude: number;
}

interface MapData {
  search_name: string
  display_name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface AlertData {
    type: 'success' | 'error';
    message: string;
}