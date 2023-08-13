import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-layout-center">
      <span className="flex items-center gap-4">
        <h2 className="border-e-[1px] border-neutral-500 pe-4 text-2xl">404</h2>
        <p>This page could not be found.</p>
      </span>
    </div>
  );
}
