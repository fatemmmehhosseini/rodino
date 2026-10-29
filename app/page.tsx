import Hero from "@/components/home/Hero";
import EventCategories from "@/components/home/EventCategories";
import SuggestedEvents from "@/components/home/SuggestedEvents"
import ExperienceBanner from "@/components/home/ExperienceBanner";
import WeeklyEvents from "@/components/home/WeeklyEvents";
import WhyRodino from "@/components/home/WhyRodino";

export default function Home() {
  return (
   <>
    <Hero />
    <EventCategories />
    <SuggestedEvents />
    <ExperienceBanner />
    <WeeklyEvents />
    <WhyRodino />
   </>
  );
}
