import { cleanup, render, screen } from "@testing-library/react";
import { FolderGit2Icon } from "lucide-react";
import { afterEach, expect, test } from "vitest";
import { Unavailable } from "./unavailable";

// Vitest globals are off, so Testing Library doesn't clean up on its own
afterEach(cleanup);

// A link, not a button: it navigates to where the content lives
test("renders the action as a named link to its href", () => {
  render(
    <Unavailable
      icon={FolderGit2Icon}
      title="Couldn't load"
      description="Try the source."
      action={{ href: "https://github.com/fileng87", label: "Open GitHub" }}
    />,
  );

  const link = screen.getByRole("link", { name: "Open GitHub" });
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("https://github.com/fileng87");
  expect(link.getAttribute("target")).toBe("_blank");
});

test("leaves out the action when there is none", () => {
  render(
    <Unavailable
      icon={FolderGit2Icon}
      title="Couldn't load"
      description="Try the source."
    />,
  );

  expect(screen.queryByRole("link")).toBeNull();
});
