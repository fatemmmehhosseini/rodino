type Props = {
  description?: string;
};

export default function EventAbout({
  description,
}: Props) {
  if (!description) return null;

  return (
    <section className="mt-6 rounded-[28px] border border-[#E8E3F0] bg-white p-6 shadow-[0_8px_30px_rgba(24,21,31,0.04)] sm:p-8">
      <h2 className="text-xl font-extrabold text-[#18151F]">
        درباره این رویداد
      </h2>

      <p className="mt-5 text-sm leading-9 text-[#625C6E]">
        {description}
      </p>
    </section>
  );
}