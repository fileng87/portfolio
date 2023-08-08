import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-layout-center">
      <span className="flex gap-4 items-center">
        <h2 className="text-2xl border-e-[1px] border-neutral-500 pe-4">404</h2>
        <p>This page could not be found.</p>
      </span>
    </div>
  );
}
