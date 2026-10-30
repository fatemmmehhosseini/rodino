"use client";

import type { Event } from "@/types/event";
import { events as initialEvents } from "@/data/events";

const STORAGE_KEY = "rodino-host-events";

const emptyEvents: Event[] = [];

let cachedEvents: Event[] | null = null;

const listeners = new Set<() => void>();

function readHostEvents(): Event[] {
  if (typeof window === "undefined") {
    return emptyEvents;
  }

  const storedEvents = localStorage.getItem(STORAGE_KEY);

  if (!storedEvents) {
    return initialEvents.filter((event) => event.providerId === 1);
  }

  try {
    return JSON.parse(storedEvents) as Event[];
  } catch {
    return initialEvents.filter((event) => event.providerId === 1);
  }
}

export function getHostEvents(): Event[] {
  if (cachedEvents === null) {
    cachedEvents = readHostEvents();
  }

  return cachedEvents;
}

export function subscribeToHostEvents(
  listener: () => void
) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function saveHostEvents(events: Event[]) {
  cachedEvents = events;

  if (typeof window !== "undefined") {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events)
    );
  }

  notifyListeners();
}

export function addHostEvent(event: Event) {
  const currentEvents = getHostEvents();

  const updatedEvents = [
    ...currentEvents,
    event,
  ];

  saveHostEvents(updatedEvents);

  return event;
}

export function updateHostEvent(
  eventId: number,
  updatedEvent: Event
) {
  const currentEvents = getHostEvents();

  const updatedEvents = currentEvents.map((event) =>
    event.id === eventId
      ? updatedEvent
      : event
  );

  saveHostEvents(updatedEvents);

  return updatedEvent;
}

export function getHostEventById(
  eventId: number
) {
  const hostEvents = getHostEvents();

  return hostEvents.find(
    (event) => event.id === eventId
  );
}

export function deleteHostEvent(eventId: number) {
  const currentEvents = getHostEvents();

  const updatedEvents = currentEvents.filter(
    (event) => event.id !== eventId
  );

  saveHostEvents(updatedEvents);
}