import { create } from "zustand";

// Whether the page entrance has played in this page load. The store survives
// client-side navigation (e.g. switching locale remounts the page) but resets
// on a full reload, so the intro plays once per visit.
// Only written from effects, so the server always sees `false`: no state is
// shared between requests and hydration stays consistent.
export const useIntroStore = create<{
  played: boolean;
  markPlayed: () => void;
}>((set) => ({
  played: false,
  markPlayed: () => set({ played: true }),
}));
