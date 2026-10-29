import type { SeatSection } from "@/types/event";

export const seatSections: SeatSection[] = [
  // ==================== سالن رودینو - venueId: 1 ====================

  {
    id: 1,
    venueId: 1,
    name: "VIP",
    price: 2500000,
    rows: 3,
    seatsPerRow: 10,
  },
  {
    id: 2,
    venueId: 1,
    name: "A",
    price: 1800000,
    rows: 5,
    seatsPerRow: 10,
  },
  {
    id: 3,
    venueId: 1,
    name: "B",
    price: 1200000,
    rows: 6,
    seatsPerRow: 10,
  },

  // ==================== سالن آزادی - venueId: 2 ====================

  {
    id: 4,
    venueId: 2,
    name: "VIP",
    price: 3000000,
    rows: 3,
    seatsPerRow: 10,
  },
  {
    id: 5,
    venueId: 2,
    name: "A",
    price: 2200000,
    rows: 5,
    seatsPerRow: 10,
  },
  {
    id: 6,
    venueId: 2,
    name: "B",
    price: 1500000,
    rows: 6,
    seatsPerRow: 10,
  },

  // ==================== برج میلاد - venueId: 3 ====================

  {
    id: 7,
    venueId: 3,
    name: "VIP",
    price: 3500000,
    rows: 4,
    seatsPerRow: 10,
  },
  {
    id: 8,
    venueId: 3,
    name: "A",
    price: 2500000,
    rows: 6,
    seatsPerRow: 10,
  },
  {
    id: 9,
    venueId: 3,
    name: "B",
    price: 1800000,
    rows: 8,
    seatsPerRow: 10,
  },

  // ==================== سالن همایش‌های اصفهان - venueId: 4 ====================

  {
    id: 10,
    venueId: 4,
    name: "VIP",
    price: 2800000,
    rows: 3,
    seatsPerRow: 10,
  },
  {
    id: 11,
    venueId: 4,
    name: "A",
    price: 2000000,
    rows: 5,
    seatsPerRow: 10,
  },
  {
    id: 12,
    venueId: 4,
    name: "B",
    price: 1400000,
    rows: 7,
    seatsPerRow: 10,
  },
];