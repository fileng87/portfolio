import { notFound } from "next/navigation";

// Any path no other route matches renders [locale]/not-found.tsx
export default function CatchAll() {
  notFound();
}
