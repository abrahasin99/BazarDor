import Link from "next/link";
import { notFound } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

const API =
  "https://api.api-store.workers.dev/api/bazardor/products";

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  hali: "হালি",
  g: "গ্রাম",
};

const bn = (n: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `${API}/${encodeURIComponent(id)}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to load product (${res.status})`);
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const p = await getProduct(id);

  if (!p) {
    notFound();
  }

  const unit = UNIT_BN[p.unit] ?? p.unit;

  const rows = p.markets
    .map((m) => ({
      ...m,
      avg: (m.min + m.max) / 2,
    }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = Math.min(
    ...p.markets.map((m) => m.min)
  );

  const highest = Math.max(
    ...p.markets.map((m) => m.max)
  );

  const average = Math.round(
    rows.reduce((sum, row) => sum + row.avg, 0) /
      rows.length
  );

  const { dir, pct } = p.change;

  const diff = Math.abs(
    p.today - p.yesterday
  );

  const dirWord =
    dir === "up"
      ? "বেড়েছে"
      : dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";

  const dirColor =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
        ? "text-green-700"
        : "text-stone-500";

  const arrow =
    dir === "up"
      ? "▲"
      : dir === "down"
        ? "▼"
        : "–";

  return (
    <main className="min-h-screen bg-[#f1f5f0] px-4 py-6 text-[#1a2420]">
      <div className="mx-auto max-w-4xl">

        {/* Breadcrumb */}
        <nav
          className="mb-4 flex items-center gap-2 text-xs text-stone-500"
          aria-label="breadcrumb"
        >
          <Link
            href="/"
            className="hover:underline"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${p.category}`}
            className="hover:underline"
          >
            {p.categoryNameBn}
          </Link>

          <span>›</span>

          <span aria-current="page">
            {p.nameBn}
          </span>
        </nav>

        {/* Header Card */}
        <section className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e1e9de] bg-[#fafcf9] p-5">

          <div
            className="grid size-15 place-items-center rounded-xl border border-[#e1e9de] bg-[#eef2ec] text-3xl"
            aria-hidden
          >
            {p.image}
          </div>

          <div className="min-w-[200px] flex-1">

            <h1 className="text-2xl font-extrabold leading-tight">
              {p.nameBn}
            </h1>

            <p className="mt-1 text-xs text-stone-500">
              প্রতি {unit} · {p.categoryNameBn}
            </p>

            <p className="text-xs text-stone-500">
              গতকালের তুলনায় আজকে দাম{" "}
              <strong className={dirColor}>
                {dirWord}
              </strong>

              {dir !== "flat" && (
                <>
                  {" · "}
                  {bn(diff)} টাকা
                </>
              )}
            </p>

          </div>

          {/* Today's Price */}
          <div className="flex w-full flex-col items-center gap-0.5 rounded-xl border border-[#e1e9de] bg-[#eef2ec] px-6 py-3 sm:w-auto">

            <span className="text-[11px] text-stone-500">
              আজকের দাম
            </span>

            <span className="text-4xl font-extrabold leading-tight">
              {bn(p.today)}
            </span>

            <span className="text-[11px] text-stone-500">
              টাকা / {unit}
            </span>

            <span
              className={`text-xs font-bold ${dirColor}`}
            >
              {arrow} {bn(pct)}%
            </span>

          </div>

        </section>

        {/* Summary + Table */}
        <section className="rounded-2xl border border-[#e1e9de] bg-[#fafcf9] p-10">

          <h2 className="mb-3 text-lg font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">

            <Stat
              label="সর্বনিম্ন দাম"
              value={bn(lowest)}
              note="সবচেয়ে কম দামের বাজার"
              color="text-green-700"
            />

            <Stat
              label="সর্বোচ্চ দাম"
              value={bn(highest)}
              note="সবচেয়ে বেশি দামের বাজার"
              color="text-red-600"
            />

            <Stat
              label="গড় দাম"
              value={bn(average)}
              note={`প্রতি ${unit} এর হিসাব`}
              color="text-green-700"
            />

          </div>

          <h2 className="mb-3 mt-6 text-lg font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#e1e9de] bg-white">

            <table className="w-full min-w-[560px] border-collapse text-base">

              <thead>
                <tr className="border-b border-[#e1e9de] text-sm font-medium text-stone-500">

                  <th className="px-3.5 py-3 text-left font-medium">
                    বাজার
                  </th>

                  <th className="px-3.5 py-3 text-left font-medium">
                    বিভাগ
                  </th>

                  <th className="px-3.5 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3.5 py-3 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-3.5 py-3 text-right font-medium">
                    গড়
                  </th>

                </tr>
              </thead>

              <tbody>

                {rows.map((r) => (
                  <tr
                    key={`${r.market}-${r.division}`}
                    className="border-b border-[#e1e9de] last:border-0 even:bg-[#f4f7f3]"
                  >

                    <td className="px-3.5 py-3">
                      {r.market}
                    </td>

                    <td className="px-3.5 py-3">
                      {r.division}
                    </td>

                    <td className="px-3.5 py-3 text-right tabular-nums">
                      {bn(r.min)} টাকা
                    </td>

                    <td className="px-3.5 py-3 text-right tabular-nums">
                      {bn(r.max)} টাকা
                    </td>

                    <td className="px-3.5 py-3 text-right font-bold tabular-nums">
                      {bn(r.avg)} টাকা
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-[#e1e9de] bg-white px-3.5 py-3">

      <span className="text-[11px] text-stone-500">
        {label}
      </span>

      <span
        className={`text-[22px] font-extrabold ${color}`}
      >
        {value}{" "}
        <small className="text-[13px] font-semibold">
          টাকা
        </small>
      </span>

      <span className="text-[11px] text-stone-500">
        {note}
      </span>

    </div>
  );
}