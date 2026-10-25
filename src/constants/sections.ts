export const sections = ["projects", "toolbox", "guestbook"] as const;

// Nav entries: the top of the page (the id on <main>), then each section
export const home = "home";
export const navItems = [home, ...sections] as const;
