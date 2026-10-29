import { CreditCard, User } from "lucide-react";


type Props = {
  fullName: string;
  phone: string;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  fullNameError: string;
  phoneError: string;
  onContinue: () => void;
  disabled: boolean;
};

export default function CheckoutForm({
  fullName,
  phone,
  onFullNameChange,
  onPhoneChange,
  fullNameError,
  phoneError,
  onContinue,
  disabled,
}: Props) {
  return (
    <section className="rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_10px_35px_rgba(24,21,31,0.05)] sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E9FF] text-[#4C1D95]">
          <User size={21} />
        </div>

        <div>
          <h2 className="font-extrabold text-[#27124B]">
            اطلاعات خریدار
          </h2>

          <p className="mt-1 text-xs text-[#9992A5]">
            اطلاعات لازم برای تکمیل رزرو
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-xs font-bold text-[#302B3A]"
          >
            نام و نام خانوادگی
          </label>

          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => {
              onFullNameChange(event.target.value);
            }}
            placeholder="نام و نام خانوادگی"
            className={`w-full rounded-2xl border ${
              fullNameError
                ? "border-red-400"
                : "border-[#E8E3F0]"
            } bg-[#FBFAFD] px-4 py-3.5 text-sm text-[#302B3A] outline-none transition focus:border-[#8E4368] focus:bg-white`}
          />

          {fullNameError && (
            <p className="mt-2 text-[11px] font-medium text-red-500">
              {fullNameError}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-bold text-[#302B3A]"
          >
            شماره موبایل
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => {
              onPhoneChange(event.target.value);
            }}
            placeholder="09xxxxxxxxx"
            dir="ltr"
            className={`w-full rounded-2xl border ${
              phoneError
                ? "border-red-400"
                : "border-[#E8E3F0]"
            } bg-[#FBFAFD] px-4 py-3.5 text-left text-sm text-[#302B3A] outline-none transition focus:border-[#8E4368] focus:bg-white`}
          />

          {phoneError && (
            <p className="mt-2 text-[11px] font-medium text-red-500">
              {phoneError}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 rounded-2xl bg-[#F8F7FC] p-4">
        <div className="flex items-start gap-3">
          <CreditCard
            size={18}
            className="mt-0.5 shrink-0 text-[#6D28D9]"
          />

          <p className="text-xs leading-6 text-[#77728A]">
            اطلاعات پرداخت در مرحله بعد نمایش داده خواهد شد.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="btn mt-6 flex w-full items-center justify-center gap-2 shadow-[0_10px_25px_rgba(59,22,120,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(59,22,120,0.25)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
      >
        ادامه به پرداخت
      </button>
    </section>
  );
}