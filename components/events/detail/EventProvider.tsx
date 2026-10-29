import { UserRound } from "lucide-react";

import type { Provider } from "@/types/event";

type Props = {
  provider?: Provider;
};

export default function EventProvider({
  provider,
}: Props) {
  if (!provider) return null;

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <h2 className="text-xl font-extrabold text-[#18151F] max-sm:text-center">
        برگزارکننده
      </h2>

      <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#F8F7FC] p-5 sm:flex-row sm:items-center max-sm:text-center">
        <div className="flex max-sm:m-auto h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3B1678] text-white">
          <UserRound size={24} />
        </div>

        <div>
          <h3 className="font-extrabold text-[#302B3A]">
            {provider.brandName}
          </h3>

          <p className="mt-1 text-sm text-[#77728A]">
            {provider.description}
          </p>
        </div>
      </div>
    </section>
  );
}