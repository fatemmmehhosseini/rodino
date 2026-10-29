import type { Seat } from "@/types/event";
import { seatSections } from "./seatMaps";

export const seats: Seat[] = [];

seatSections.forEach((section, sectionIndex) => {
  const previousRows = seatSections
    .slice(0, sectionIndex)
    .filter((item) => item.venueId === section.venueId)
    .reduce((total, item) => total + item.rows, 0);

  for (let rowIndex = 0; rowIndex < section.rows; rowIndex++) {
    const row = previousRows + rowIndex + 1;

    for (
      let seatIndex = 0;
      seatIndex < section.seatsPerRow;
      seatIndex++
    ) {
      const number = seatIndex + 1;

      seats.push({
        id: `venue-${section.venueId}-section-${section.id}-row-${row}-seat-${number}`,
        sectionId: section.id,
        row,
        number,
      });
    }
  }
});