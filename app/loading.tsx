export default function Loading() {
  return (
    <div className="container animate-pulse py-6">
      {/* Header placeholder */}
      <div className="h-10 w-48 rounded-lg bg-neutral-100 mb-6" />

      {/* Hero area */}
      <div className="h-[200px] md:h-[380px] rounded-2xl bg-neutral-100 mb-8" />

      {/* Section title */}
      <div className="h-6 w-40 rounded-lg bg-neutral-100 mb-4" />

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-40 rounded-xl bg-neutral-100 md:h-56" />
            <div className="h-4 w-3/4 rounded bg-neutral-100" />
            <div className="h-4 w-1/2 rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
