import type { MetaEvent } from "@/types/event";

export const metaEvents: MetaEvent[] = [
  // =========================
  // MUSIC — event 1
  // =========================
  {
    id: 1,
    key: "music.artistName",
    value: "گروه موسیقی رودینو",
    eventId: 1,
  },
  {
    id: 2,
    key: "music.musicGenre",
    value: "پاپ",
    eventId: 1,
  },
  {
    id: 3,
    key: "music.durationMinutes",
    value: "120",
    eventId: 1,
  },
  {
    id: 4,
    key: "music.hasInterval",
    value: "true",
    eventId: 1,
  },
  {
    id: 5,
    key: "music.stageType",
    value: "اصلی",
    eventId: 1,
  },
  {
    id: 6,
    key: "music.ageRestriction",
    value: "12",
    eventId: 1,
  },

  // =========================
  // MUSIC — event 2
  // =========================
  {
    id: 7,
    key: "music.artistName",
    value: "فستیوال موسیقی رودینو",
    eventId: 2,
  },
  {
    id: 8,
    key: "music.musicGenre",
    value: "پاپ و تلفیقی",
    eventId: 2,
  },
  {
    id: 9,
    key: "music.durationMinutes",
    value: "180",
    eventId: 2,
  },
  {
    id: 10,
    key: "music.hasInterval",
    value: "true",
    eventId: 2,
  },
  {
    id: 11,
    key: "music.stageType",
    value: "اصلی",
    eventId: 2,
  },
  {
    id: 12,
    key: "music.ageRestriction",
    value: "12",
    eventId: 2,
  },

  // =========================
  // MUSIC — event 3
  // =========================
  {
    id: 13,
    key: "music.artistName",
    value: "گروه موسیقی زنده رودینو",
    eventId: 3,
  },
  {
    id: 14,
    key: "music.musicGenre",
    value: "پاپ",
    eventId: 3,
  },
  {
    id: 15,
    key: "music.durationMinutes",
    value: "90",
    eventId: 3,
  },
  {
    id: 16,
    key: "music.hasInterval",
    value: "false",
    eventId: 3,
  },
  {
    id: 17,
    key: "music.stageType",
    value: "آکوستیک",
    eventId: 3,
  },
  {
    id: 18,
    key: "music.ageRestriction",
    value: "10",
    eventId: 3,
  },

  // =========================
  // SPORTS — event 4
  // =========================
  {
    id: 19,
    key: "sportType",
    value: "فوتبال",
    eventId: 4,
  },
  {
    id: 20,
    key: "matchType",
    value: "tournament",
    eventId: 4,
  },
  {
    id: 21,
    key: "homeTeam",
    value: "تیم رودینو",
    eventId: 4,
  },
  {
    id: 22,
    key: "awayTeam",
    value: "تیم مهمان",
    eventId: 4,
  },
  {
    id: 23,
    key: "leagueName",
    value: "جام رودینو",
    eventId: 4,
  },
  {
    id: 24,
    key: "ageGroup",
    value: "senior",
    eventId: 4,
  },
  {
    id: 25,
    key: "genderCategory",
    value: "men",
    eventId: 4,
  },
  {
    id: 26,
    key: "varEnabled",
    value: "true",
    eventId: 4,
  },
  {
    id: 27,
    key: "matchImportance",
    value: "high",
    eventId: 4,
  },

  // =========================
  // SPORTS — event 5
  // =========================
  {
    id: 28,
    key: "sportType",
    value: "بسکتبال",
    eventId: 5,
  },
  {
    id: 29,
    key: "matchType",
    value: "league",
    eventId: 5,
  },
  {
    id: 30,
    key: "homeTeam",
    value: "رودینو",
    eventId: 5,
  },
  {
    id: 31,
    key: "awayTeam",
    value: "تیم مهمان",
    eventId: 5,
  },
  {
    id: 32,
    key: "leagueName",
    value: "لیگ بسکتبال رودینو",
    eventId: 5,
  },
  {
    id: 33,
    key: "ageGroup",
    value: "senior",
    eventId: 5,
  },
  {
    id: 34,
    key: "genderCategory",
    value: "men",
    eventId: 5,
  },
  {
    id: 35,
    key: "matchImportance",
    value: "normal",
    eventId: 5,
  },

  // =========================
  // SPORTS — event 6
  // =========================
  {
    id: 36,
    key: "sportType",
    value: "تنیس",
    eventId: 6,
  },
  {
    id: 37,
    key: "matchType",
    value: "tournament",
    eventId: 6,
  },
  {
    id: 38,
    key: "ageGroup",
    value: "senior",
    eventId: 6,
  },
  {
    id: 39,
    key: "genderCategory",
    value: "mixed",
    eventId: 6,
  },
  {
    id: 40,
    key: "standingArea",
    value: "false",
    eventId: 6,
  },

  // =========================
  // THEATER — event 7
  // =========================
  {
    id: 41,
    key: "theater.playTitle",
    value: "شب‌های تئاتر",
    eventId: 7,
  },
  {
    id: 42,
    key: "theater.director",
    value: "کارگردان رودینو",
    eventId: 7,
  },
  {
    id: 43,
    key: "theater.actCount",
    value: "2",
    eventId: 7,
  },
  {
    id: 44,
    key: "theater.hasInterval",
    value: "true",
    eventId: 7,
  },
  {
    id: 45,
    key: "theater.durationMinutes",
    value: "120",
    eventId: 7,
  },
  {
    id: 46,
    key: "theater.ageSuitability",
    value: "adult",
    eventId: 7,
  },
  {
    id: 47,
    key: "theater.stageType",
    value: "proscenium",
    eventId: 7,
  },

  // =========================
  // THEATER — event 8
  // =========================
  {
    id: 48,
    key: "theater.playTitle",
    value: "یک شب کمدی",
    eventId: 8,
  },
  {
    id: 49,
    key: "theater.director",
    value: "گروه نمایشی رودینو",
    eventId: 8,
  },
  {
    id: 50,
    key: "theater.actCount",
    value: "1",
    eventId: 8,
  },
  {
    id: 51,
    key: "theater.hasInterval",
    value: "false",
    eventId: 8,
  },
  {
    id: 52,
    key: "theater.durationMinutes",
    value: "90",
    eventId: 8,
  },
  {
    id: 53,
    key: "theater.ageSuitability",
    value: "all",
    eventId: 8,
  },
  {
    id: 54,
    key: "theater.stageType",
    value: "black_box",
    eventId: 8,
  },

  // =========================
  // THEATER — event 9
  // =========================
  {
    id: 55,
    key: "theater.playTitle",
    value: "آخرین پرده",
    eventId: 9,
  },
  {
    id: 56,
    key: "theater.director",
    value: "گروه تئاتر رودینو",
    eventId: 9,
  },
  {
    id: 57,
    key: "theater.actCount",
    value: "2",
    eventId: 9,
  },
  {
    id: 58,
    key: "theater.hasInterval",
    value: "true",
    eventId: 9,
  },
  {
    id: 59,
    key: "theater.durationMinutes",
    value: "110",
    eventId: 9,
  },
  {
    id: 60,
    key: "theater.ageSuitability",
    value: "adult",
    eventId: 9,
  },
  {
    id: 61,
    key: "theater.stageType",
    value: "proscenium",
    eventId: 9,
  },

  // =========================
  // TECHNOLOGY — event 10
  // =========================
  {
    id: 62,
    key: "tech.eventType",
    value: "conference",
    eventId: 10,
  },
  {
    id: 63,
    key: "tech.techStack",
    value: "[\"AI\", \"Machine Learning\"]",
    eventId: 10,
  },
  {
    id: 64,
    key: "tech.tracks",
    value: "[\"هوش مصنوعی\", \"یادگیری ماشین\"]",
    eventId: 10,
  },
  {
    id: 65,
    key: "tech.prizePool",
    value: "100 میلیون تومان",
    eventId: 10,
  },
  {
    id: 66,
    key: "tech.requiresLaptop",
    value: "false",
    eventId: 10,
  },
  {
    id: 67,
    key: "tech.demoDay",
    value: "false",
    eventId: 10,
  },
  {
    id: 68,
    key: "tech.apiProvided",
    value: "true",
    eventId: 10,
  },

  // =========================
  // TECHNOLOGY — event 11
  // =========================
  {
    id: 69,
    key: "tech.eventType",
    value: "meetup",
    eventId: 11,
  },
  {
    id: 70,
    key: "tech.techStack",
    value: "[\"JavaScript\", \"React\", \"Next.js\"]",
    eventId: 11,
  },
  {
    id: 71,
    key: "tech.tracks",
    value: "[\"Frontend\", \"Backend\"]",
    eventId: 11,
  },
  {
    id: 72,
    key: "tech.requiresLaptop",
    value: "false",
    eventId: 11,
  },
  {
    id: 73,
    key: "tech.demoDay",
    value: "false",
    eventId: 11,
  },

  // =========================
  // TECHNOLOGY — event 12
  // =========================
  {
    id: 74,
    key: "tech.eventType",
    value: "networking",
    eventId: 12,
  },
  {
    id: 75,
    key: "tech.techStack",
    value: "[\"Startup\", \"Product\", \"AI\"]",
    eventId: 12,
  },
  {
    id: 76,
    key: "tech.tracks",
    value: "[\"استارتاپ\", \"سرمایه‌گذاری\", \"محصول\"]",
    eventId: 12,
  },
  {
    id: 77,
    key: "tech.requiresLaptop",
    value: "false",
    eventId: 12,
  },
  {
    id: 78,
    key: "tech.demoDay",
    value: "true",
    eventId: 12,
  },

  // =========================
  // TRAVEL_TOURISM — event 13
  // =========================
  {
    id: 79,
    key: "tour.tourType",
    value: "nature",
    eventId: 13,
  },
  {
    id: 80,
    key: "tour.destination",
    value: "شمال ایران",
    eventId: 13,
  },
  {
    id: 81,
    key: "tour.origin",
    value: "اصفهان",
    eventId: 13,
  },
  {
    id: 82,
    key: "tour.transportation",
    value: "land",
    eventId: 13,
  },
  {
    id: 83,
    key: "tour.durationDays",
    value: "3",
    eventId: 13,
  },
  {
    id: 84,
    key: "tour.accommodation",
    value: "اقامتگاه بوم‌گردی",
    eventId: 13,
  },
  {
    id: 85,
    key: "tour.localGuide",
    value: "true",
    eventId: 13,
  },
  {
    id: 86,
    key: "tour.includesInsurance",
    value: "true",
    eventId: 13,
  },

  // =========================
  // TRAVEL_TOURISM — event 14
  // =========================
  {
    id: 87,
    key: "tour.tourType",
    value: "adventure",
    eventId: 14,
  },
  {
    id: 88,
    key: "tour.destination",
    value: "کویر مصر",
    eventId: 14,
  },
  {
    id: 89,
    key: "tour.origin",
    value: "اصفهان",
    eventId: 14,
  },
  {
    id: 90,
    key: "tour.transportation",
    value: "land",
    eventId: 14,
  },
  {
    id: 91,
    key: "tour.durationDays",
    value: "2",
    eventId: 14,
  },
  {
    id: 92,
    key: "tour.accommodation",
    value: "کمپ کویری",
    eventId: 14,
  },
  {
    id: 93,
    key: "tour.localGuide",
    value: "true",
    eventId: 14,
  },
  {
    id: 94,
    key: "tour.includesInsurance",
    value: "true",
    eventId: 14,
  },

  // =========================
  // TRAVEL_TOURISM — event 15
  // =========================
  {
    id: 95,
    key: "tour.tourType",
    value: "adventure",
    eventId: 15,
  },
  {
    id: 96,
    key: "tour.destination",
    value: "منطقه کوهستانی",
    eventId: 15,
  },
  {
    id: 97,
    key: "tour.origin",
    value: "مشهد",
    eventId: 15,
  },
  {
    id: 98,
    key: "tour.transportation",
    value: "land",
    eventId: 15,
  },
  {
    id: 99,
    key: "tour.durationDays",
    value: "2",
    eventId: 15,
  },
  {
    id: 100,
    key: "tour.accommodation",
    value: "اقامتگاه بوم‌گردی",
    eventId: 15,
  },
  {
    id: 101,
    key: "tour.localGuide",
    value: "true",
    eventId: 15,
  },
  {
    id: 102,
    key: "tour.includesInsurance",
    value: "true",
    eventId: 15,
  },
];