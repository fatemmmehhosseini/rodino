import { create } from "zustand";

type ReservationState = {
  eventId: number | null;
  showtimeId: number | null;
  venueId: number | null;
  selectedSeatIds: string[];
  totalPrice: number;

  setReservation: (data: {
    eventId: number;
    showtimeId: number;
    venueId: number;
    selectedSeatIds: string[];
    totalPrice: number;
  }) => void;

  clearReservation: () => void;
};

export const useReservationStore = create<ReservationState>((set) => ({
  eventId: null,
  showtimeId: null,
  venueId: null,
  selectedSeatIds: [],
  totalPrice: 0,

  setReservation: (data) =>
    set({
      eventId: data.eventId,
      showtimeId: data.showtimeId,
      venueId: data.venueId,
      selectedSeatIds: data.selectedSeatIds,
      totalPrice: data.totalPrice,
    }),

  clearReservation: () =>
    set({
      eventId: null,
      showtimeId: null,
      venueId: null,
      selectedSeatIds: [],
      totalPrice: 0,
    }),
}));
