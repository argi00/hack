interface SectionHeaderProps {
  label: string;
  title: string;
  id?: string;
}

export default function SectionHeader({ label, title, id }: SectionHeaderProps) {
  return (
    <>
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#FF6600]">
        {label}
      </p>
      <h2
        id={id}
        className="mt-3 text-center text-xl font-bold text-[#704214] sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {title}
      </h2>
    </>
  );
}
