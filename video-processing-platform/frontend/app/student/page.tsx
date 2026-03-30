import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { fetchLectures } from "./lectures";
import { currentUser } from "@clerk/nextjs/server";
import SearchLecturesInput from "./SearchLecturesInput";
import SubjectSelect from "./SubjectSelect";
import LectureCard from "./LectureCard";
import { normalizeSubject, SUBJECT_OPTIONS } from "../../lib/subjects";
import Link from "next/link";

type StudentLibraryPageProps = {
  searchParams: Promise<{ q?: string; subject?: string; sort?: string }>;
};

const SORT_OPTIONS = ["relevance", "recent", "a-z", "duration"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function normalizeSort(sort: string | undefined, hasQuery: boolean): SortOption {
  if (!sort) return hasQuery ? "relevance" : "recent";

  const normalized = sort.toLowerCase();
  if (!SORT_OPTIONS.includes(normalized as SortOption)) {
    return hasQuery ? "relevance" : "recent";
  }

  if (normalized === "relevance" && !hasQuery) return "recent";

  return normalized as SortOption;
}

export default async function StudentLibraryPage({
  searchParams,
}: StudentLibraryPageProps) {
  const { q, subject, sort } = await searchParams;

  const query = (q ?? "").trim();
  const selectedSubject = normalizeSubject(subject);
  const selectedSort = normalizeSort(sort, Boolean(query));

  let lectures = [] as Awaited<ReturnType<typeof fetchLectures>>;
  let loadError: string | null = null;

  const user = await currentUser();

  try {
    lectures = await fetchLectures(query, { subject: selectedSubject });
  } catch {
    loadError =
      "Lecture service is currently unavailable. Please try again shortly.";
  }

  const getSortHref = (targetSort: SortOption) => {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (selectedSubject !== "All Subjects") {
      params.set("subject", selectedSubject);
    }

    if (
      targetSort !== "recent" &&
      !(targetSort === "relevance" && query)
    ) {
      params.set("sort", targetSort);
    }

    return params.toString() ? `/student?${params}` : "/student";
  };

  const sortedLectures =
    selectedSort === "relevance" && query
      ? lectures
      : [...lectures].sort((a, b) => {
          if (selectedSort === "a-z") {
            return a.title.localeCompare(b.title);
          }

          if (selectedSort === "duration") {
            return (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0);
          }

          const aTime = new Date(
            a.updatedAt ?? a.publishedDate
          ).getTime();
          const bTime = new Date(
            b.updatedAt ?? b.publishedDate
          ).getTime();

          if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
            return bTime - aTime;
          }

          return b.title.localeCompare(a.title);
        });

  const hasActiveFilters =
    Boolean(query) ||
    selectedSubject !== "All Subjects" ||
    selectedSort !== "recent";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar active="library" />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Student Library
                </span>

                <h1 className="text-[2rem] font-extrabold leading-snug tracking-tight text-slate-900 md:text-[2.5rem]">
                  My Learning Library
                </h1>

                <p className="text-[15px] font-medium text-slate-600 md:text-base md:font-normal">
                  Continue where you left off and explore new topics.
                </p>
              </div>

              <div className="w-full md:max-w-lg">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Search Lectures
                </p>
                <div className="flex-1">
                  <SearchLecturesInput initialQuery={q ?? ""} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-200 pt-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-500 leading-tight">
                  Subject
                </span>
                <div className="min-w-48">
                  <SubjectSelect
                    options={SUBJECT_OPTIONS}
                    selectedSubject={selectedSubject}
                  />
                </div>
              </div>

              <div className="ml-auto flex w-full flex-col gap-1 sm:w-auto md:items-end">
                <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                  <span className="text-xs font-semibold text-slate-500 leading-tight">
                    Sort
                  </span>

                  {SORT_OPTIONS.map((sortOption) => {
                    if (sortOption === "relevance" && !query) return null;

                    const isActive = selectedSort === sortOption;

                    const label =
                      sortOption === "relevance"
                        ? "Best"
                        : sortOption === "recent"
                        ? "Latest"
                        : sortOption === "a-z"
                        ? "A–Z"
                        : "Longest";

                    return (
                      <Link
                        key={sortOption}
                        href={getSortHref(sortOption)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 md:justify-end mt-1">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {sortedLectures.length} results
                  </span>

                  {hasActiveFilters && (
                    <Link
                      href="/student"
                      className="rounded-full border border-rose-200 px-2 py-0.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      Clear
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {loadError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                {loadError}
              </div>
            )}
          </div>

          {/* LECTURES */}
          {sortedLectures.length > 0 ? (
            <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedLectures.map((lecture) => (
                <LectureCard
                  key={lecture.slug}
                  lecture={lecture}
                  userId={user?.id}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-center">
              <p className="text-base font-semibold text-slate-700">No lectures found.</p>
              <p className="mt-1 text-sm text-slate-500">
                Try another keyword, subject, or sorting option.
              </p>
              {hasActiveFilters && (
                <div className="mt-4">
                  <Link
                    href="/student"
                    className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Reset filters
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}