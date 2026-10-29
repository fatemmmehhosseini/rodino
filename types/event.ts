export interface Provider {
  id: number;
  brandName: string;
  slug: string;
  description: string;
  userType: "individual" | "legal";
  firstName?: string;
  lastName?: string;
  legalName?: string;
  website?: string;
  thumbId?: number;
}

export interface Event {
  id: number;
  providerId: number;

  eventMode: "online" | "in-person";
  isFree: boolean;
   isPopular: boolean;

  eventCatagory: string;
  eventSubCatagory?: string;

  title: string;
  description?: string;
  slug: string;

  salesStartAt: string;
  salesEndAt: string;

  countryId?: number;
  provinceId?: number;
  cityId?: number;

  eventVenues?: string;
  venueId?: number;

  curencyId?: string;
  price?: number;
  poster?: string;

  status: string;
  eventStatus: string;
}

export interface Showtime {
  id: number;
  eventId: number;
  venueId: number;
  startDate: string;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
  address: string;
  capacity: number;
}

export interface MetaEvent {
  id: number;
  key: string;
  value: string;
  eventId: number;
}

export interface SeatSection {
  id: number;
  venueId: number;
  name: string;
  price: number;
  rows: number;
  seatsPerRow: number;
}

export interface Seat {
  id: string;
  sectionId: number;
  row: number;
  number: number;
}

export interface ReservedSeat {
  showtimeId: number;
  seatId: string;
}

export interface EventCategory {
  id: string;
  title: string;
  slug: string;
}