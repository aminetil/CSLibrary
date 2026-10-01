import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">404</p>
        <h1 className="mt-4 text-2xl font-black text-slate-900">Page introuvable</h1>
        <p className="mt-3 text-sm text-slate-600">
          La page demandée n’existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
