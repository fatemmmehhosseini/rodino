"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/events");
      return;
    }

    router.push(`/events?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-[520px] items-center gap-1 rounded-full border border-white/20 bg-white/95 p-2 text-[#18151f] shadow-2xl shadow-black/20 lg:mx-0"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
        <Search
          size={20}
          strokeWidth={2}
          className="shrink-0 text-[#7c3aed]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی رویداد..."
          className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-[#8b8794]"
        />
      </div>

      <button type="submit" className="btn shrink-0 px-5 py-3 text-sm">
        جستجو
      </button>
    </form>
  );
}