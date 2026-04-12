"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  id?: string;
  name?: string;
};

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search anything...",
  id = "wallet-search",
  name = "q",
}: Props) {
  return (
    <form
      role="search"
      className="mx-auto w-full max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-14 w-full rounded-full border border-neutral-200/90 bg-white px-6 pr-14 text-base text-neutral-900 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] outline-none ring-0 transition-shadow placeholder:text-neutral-400 focus:border-neutral-300 focus:shadow-[0_12px_40px_-14px_rgba(0,0,0,0.22)] sm:h-[3.25rem] sm:text-[17px]"
        />
      </div>
    </form>
  );
}
