"use client";

import { X, XCircle } from "lucide-react";

type Props = {
  onClose: () => void;
  onBackToEvents: () => void;
};

export default function PaymentFailedModal({
  onClose,
  onBackToEvents,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B102B]/50 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-[30px] bg-white p-6 shadow-[0_25px_70px_rgba(24,21,31,0.2)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F7FC] text-[#77728A] transition hover:bg-[#EEEAF4]"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F0] text-[#D94A4A]">
            <XCircle size={34} />
          </div>

          <h2 className="text-2xl font-black text-[#27124B]">
            پرداخت ناموفق بود
          </h2>

          <p className="mt-3 max-w-sm text-xs leading-6 text-[#9992A5]">
            عملیات پرداخت انجام نشد. می‌توانید دوباره برای
            پرداخت تلاش کنید.
          </p>

          <div className="mt-7 grid w-full gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="btn"
            >
              تلاش مجدد
            </button>

            <button
              type="button"
              onClick={onBackToEvents}
              className="rounded-2xl border border-[#E4DFEA] bg-white px-5 py-4 text-sm font-bold text-[#6F687A] transition hover:bg-[#F8F7FC]"
            >
              بازگشت به رویدادها
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}