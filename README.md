# Portfolio

Personal portfolio built with Next.js 16.

## Setup

This repository uses `pnpm`.

Create `.env` from `example.env`:

```env
GITHUB_TOKEN=
NEXT_PUBLIC_BASE_URL=
```

Environment variables:

- `GITHUB_TOKEN`: used by the GitHub API routes to fetch profile stats and repository data.
- `NEXT_PUBLIC_BASE_URL`: public base URL for loading custom Giscus theme assets.

Use a public URL for `NEXT_PUBLIC_BASE_URL` because Giscus cannot load custom theme assets from `localhost`.

Example:

```env
NEXT_PUBLIC_BASE_URL=https://your-public-url.ngrok-free.app
```

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm format
```

## Docker

```bash
docker compose up --build
```

## License

MIT

## Star History

<a href="https://www.star-history.com/?repos=fileng87%2Fportfolio&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=fileng87/portfolio&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=fileng87/portfolio&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=fileng87/portfolio&type=date&legend=top-left" />
 </picture>
</a>