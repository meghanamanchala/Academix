"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SubjectSelectProps = {
  options: readonly string[];
  selectedSubject: string;
};

export default function SubjectSelect({
  options,
  selectedSubject,
}: SubjectSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (nextSubject: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSubject && nextSubject !== "All Subjects") {
      params.set("subject", nextSubject);
    } else {
      params.delete("subject");
    }

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  return (
    <select
      value={selectedSubject}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
