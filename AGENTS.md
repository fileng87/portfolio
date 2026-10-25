<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Architecture: Feature-based

```
messages/               # Translations, one JSON per locale (next-intl)
src/
├── app/[locale]/       # Routing only (layout, page, route handlers)
├── i18n/               # next-intl routing, request config, navigation
├── features/
│   └── <feature>/      # e.g. hero, about, projects
│       ├── components/
│       ├── hooks/
│       ├── api/        # Data fetching / server actions
│       ├── types/      # Types shared within the feature
│       ├── constants/  # Constants used within the feature
│       ├── stores/     # Feature state (zustand)
│       └── index.ts    # Public API
├── components/         # Shared components (header, footer, ...)
│   ├── ui/             # shadcn/ui primitives, kept as generated
│   └── custom/         # Customized parts of shadcn/ui components
├── hooks/              # Shared hooks
├── constants/          # Shared constants (nav sections, locale names, ...)
├── types/              # Shared types
├── stores/             # Shared zustand stores
├── providers/          # App-wide providers, composed in app/[locale]/layout.tsx
├── lib/                # Third-party setup (API clients, env, ...)
└── utils/              # Pure helpers (cn, formatters, ...)
```

### Rules

- `app/` only composes features; no business logic.
- Import a feature only via its `index.ts` (`@/features/projects`).
- Features must not import each other; move shared code to `components/`, `hooks/`, `constants/`, `types/`, or `utils/`.
- Data constants (lists, maps, config) always go in `constants/` (the feature's own, or `src/constants/` when shared), even if only one file uses them. Never put them in component files or `components/`. Shared types go in `types/`.
- Create subfolders only when the feature needs them.
- Name files in `api/` and `types/` by resource (e.g. `repos.ts`, `stats.ts`).
- Keep API request/response types in their `api/` file; move them to `types/` once other files in the feature use them.
- Keep code inside its feature until a second feature needs it.
- State uses zustand: a store used by one feature goes in its `stores/`, a shared one in `src/stores/`. App-wide providers (theme, query client, ...) go in `providers/`.
- All user-facing text goes in `messages/`; `zh-TW.json` is the source of truth for keys and types.
- Use `Link` / `redirect` / `useRouter` from `@/i18n/navigation`, not `next/link` or `next/navigation`.
- Don't edit files in `components/ui/`. To change a shadcn component, put only the changed parts in a same-named file in `components/custom/`, built on the `ui/` ones where possible, and note what changed.
- `lib/` configures third-party libraries; `utils/` holds pure functions with no setup or side effects.
