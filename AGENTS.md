<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Architecture: Feature-based

```
src/
├── app/                # Routing only (layout, page, route handlers)
├── features/
│   └── <feature>/      # e.g. hero, about, projects
│       ├── components/
│       ├── hooks/
│       ├── api/        # Data fetching / server actions
│       ├── types/      # Types shared within the feature
│       ├── stores/     # Feature state (Context / store)
│       └── index.ts    # Public API
├── components/         # Shared components (header, footer, ...)
│   └── ui/             # shadcn/ui primitives
├── hooks/              # Shared hooks
├── providers/          # App-wide providers, composed in app/layout.tsx
├── lib/                # Third-party setup (API clients, env, ...)
└── utils/              # Pure helpers (cn, formatters, ...)
```

### Rules

- `app/` only composes features; no business logic.
- Import a feature only via its `index.ts` (`@/features/projects`).
- Features must not import each other; move shared code to `components/`, `hooks/`, or `utils/`.
- Create subfolders only when the feature needs them.
- Name files in `api/` and `types/` by resource (e.g. `repos.ts`, `stats.ts`).
- Keep API request/response types in their `api/` file; move them to `types/` once other files in the feature use them.
- Keep code inside its feature until a second feature needs it.
- State used by one feature goes in its `stores/`; app-wide providers (theme, query client, ...) go in `providers/`.
- `lib/` configures third-party libraries; `utils/` holds pure functions with no setup or side effects.
