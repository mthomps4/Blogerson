# Bloggy Blog

A quick learning spike around App Router and a POC of Code Organization.

<https://www.loom.com/share/041f7211d7c440f78229d86d97e7f041?sid=71dcec3a-bda7-4390-bb20-508d541e5997>

## Getting Started

### Update your ENVs for local dev and testing

- create a `.env.development.local`
- create a `.env.test.local`
- Add `DATABASE_URL` for migrations
- run `npm run db:setup`

### Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Explore the App

Navigate from the generic Next Hello, World page to `/posts`
If you ran `npm run db:seed` (or setup) you should see Posts here.

- Click "+ create Post" and try out Form Validations and Submitting.
  - See your new post in /posts w/ a Toast Message

## Tech Stack

- [Next.js](https://nextjs.org/docs) (APP ROUTER)
- [Prisma](https://www.prisma.io/docs)
- [TailwindCSS](https://tailwindcss.com/docs/)
- [Jest](https://jestjs.io/docs/getting-started)
- [Playwright](https://playwright.dev/docs/intro)

## How did I start / What did I change

### create-next-app@latest

✔ What is your project named? … **bloggy-blog**
✔ Would you like to use TypeScript? …  **Yes**
✔ Would you like to use ESLint? …  **Yes**
✔ Would you like to use Tailwind CSS? …  **Yes**
✔ Would you like to use `src/` directory? …  **Yes**
✔ Would you like to use App Router? (recommended) … **Yes**
✔ Would you like to customize the default import alias (@/*)? … **No**

### Eslint

- Updated `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "no-console": ["warn"],
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ]
  },
  "parser": "@typescript-eslint/parser",
  "ignorePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**"
  ]
}

```

### Prettier

- added a `.prettierrc` file

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "singleQuote": true,
  "bracketSpacing": true
}
```

### Prisma

- `npm install prisma dotenv-cli ts-node --save-dev`
- `npx prisma init --datasource-provider postgresql`
-

#### .env.local

- Create/Add a .gitignore
- Add .env.*.local
- Update the .local env with a real `DATABASE_URL`

#### Add Package Scripts

> Note: a few of these are for later... but might as well copy now.

```json
  "scripts": {
    "dev": "next dev",
    "start": "next start",
    "build": "next build",
    "build:prisma": "prisma generate",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" ",
    "db:migrate": "npm run withEnv:dev prisma migrate dev",
    "db:reset": "npm run withEnv:dev prisma migrate reset",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "npm run withEnv:dev prisma db:seed",
    "lint:fix": "npm run lint --fix",
    "test": "npm run withEnv:test jest --runInBand",
    "test:cov": "npm run withEnv:test jest --runInBand --coverage",
    "typecheck": "tsc --noEmit",
    "withEnv": "dotenv -c --",
    "withEnv:dev": "dotenv -c development --",
    "withEnv:test": "dotenv -c test --"
  },
```

#### Add first model

```prisma
model Post {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
}
```

#### Run first migration

- `npm run db:migrate`

#### Create some dummy seeds

In the package.json add

```json
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seeds.ts"
  },
```

In `/prisma` add a `seeds.ts` file and create some dummy seeds

```ts

```

## The Services Folder

We'll need to connect to services globally for things like Prisma.
Lets set up the shared utils here... [src/services](./src/services/)

- Create a new file `/src/services/prisma.ts`

```ts
  import { PrismaClient } from '@prisma/client';

declare const globalThis: {
  prisma?: PrismaClient;
};

export let prisma: PrismaClient;

if (process.env.NODE_ENV !== 'development') {
  prisma = new PrismaClient();
} else {
  if (!globalThis['prisma']) {
    globalThis['prisma'] = new PrismaClient();
  }

  prisma = globalThis['prisma'];
}

export async function disconnect() {
  await prisma.$disconnect();

  return true;
}

export async function connect() {
  await prisma.$connect();

  return true;
}
```

## UX Components VS Page Components

the `src/components` folder should be used for UI Components only.
This would be your "Storybook" folder of building blocks.

We keep Page Specific components such as a `useForm` with in the App Router folder itself.
See [app/posts/new](./src/app/posts/new/)

### ShadCN

run `npx shadcn-ui@latest init`

- ✔ Would you like to use TypeScript (recommended)? … **yes**
✔ Which style would you like to use? › **Default**
✔ Which color would you like to use as base color? › **Slate**
✔ Where is your global CSS file? … **src/app/globals.css**
✔ Would you like to use CSS variables for colors? … **no**
✔ Where is your tailwind.config.js located? … **tailwind.config.ts**
✔ Configure the import alias for components: … **@/components**
✔ Configure the import alias for utils: … **@/components/utils** // keep within src/components
✔ Are you using React Server Components? …  **yes**
✔ Write configuration to components.json. Proceed? … **yes**

`npx shadcn-ui@latest add button`
`npx shadcn-ui@latest add toast`

## Layouts VS Page VS "use client"

### Layouts

Layouts are just that - a general page layout. Depending you may not need this file as the root layout may suffice.

### Page

This is where the magic starts to happen. Page is a Server Driven component that will make fetch calls to pass data down to "use client" components. This "Page" is the main driver.

### "use client" (CreatePostForm)

Any React Client Business happens here...
See [app/posts/new/CreatePostForm](./src/app/posts/new/CreatePostForm.tsx);

Need State/UseEffect it will be a `"use client"` component.

For Forms we need to tap into [Server Actions](./src/server/) and shared [Types](./src/types/)

** Note: for the RETURN type we cannot `throw` an error.
Instead we've created a generic type to leverage for `{data, error}` returns.
Here, the client can decide what to do next.

See: [Server Types AppServerResponse<T>](./src/types/server.ts) and an example use with [CreatePostResponse](./src/types/posts.ts)

## Server Actions

Anything that would be `"use server"` or server util-y is found here.
Anything data related, and/or business logic related should be happening here.
Client Components/Pages are simply waiting on the data...
[Server Actions](./src/server/)

## Shared Types

Zod, Prisma, and Type-y Types.
this is Full Stack so Prisma is fine here.
[Types](./src/types/)

## Utils and Constants

They each have their own folder under `/src` -- Lets try not to scatter these around the app.
Folder Structure similar to Types, Server, etc. if needed.

## Other Libs We Added

- `@tailwind/forms`, `@tailwind/typography`
- `react-hook-form` and `@hookform/resolvers`
- `zod`
- `npx shadcn-ui@latest add button` AND `npx shadcn-ui@latest add toast`
  - This added a handful of `@radix-ui/*`, `clsx`, and `lucide-react`

# TODO

- Husky
- Jest
- Playwright
- CI
