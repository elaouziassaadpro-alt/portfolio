## Language Context: javascript
# JavaScript Language Prompt Snippet

## Key Concepts

- **Closures**: Functions that capture variables from their enclosing lexical scope
- **Prototypes**: Prototype chain-based inheritance underlying all JavaScript objects
- **Promises**: Asynchronous value containers enabling `.then()` chaining and `async/await`
- **Event Loop**: Single-threaded concurrency model with microtask and macrotask queues
- **Destructuring**: Extract values from objects and arrays into distinct variables
- **Spread/Rest Operators**: `...` for expanding iterables or collecting remaining arguments
- **Proxies**: Meta-programming construct to intercept and customize object operations
- **Generators**: Functions using `function*` and `yield` for lazy iteration
- **Symbol**: Unique, immutable primitive used for non-string property keys
- **WeakMap/WeakSet**: Collections with weakly-held keys allowing garbage collection
- **Modules (ESM vs CJS)**: ES Modules use `import/export`; CommonJS uses `require/module.exports`

## Import Patterns

- `import { X } from 'module'` — ESM named import
- `const X = require('module')` — CommonJS require
- `import('module')` — dynamic import returning a Promise (code splitting)
- `export default X` / `export { X }` — ESM export forms

## File Patterns

- `index.js` — barrel file or directory entry point
- `.mjs` — explicitly ES Module files
- `.cjs` — explicitly CommonJS files
- `package.json` `"type"` field — sets default module system (`"module"` or `"commonjs"`)

## Common Frameworks

- **React** — Declarative UI with virtual DOM and component model
- **Vue** — Progressive framework with reactivity system and single-file components
- **Express** — Minimal and flexible Node.js web application framework
- **Next.js** — React framework for production with hybrid rendering
- **Svelte** — Compile-time framework that shifts work from runtime to build step

## Example Language Notes

> Closure captures outer `config` variable, providing encapsulated state without class
> overhead. The returned object's methods share access to the same `config` reference,
> forming a module pattern that was standard before ES Modules.
>
> When encountering `.mjs` vs `.cjs` extensions, the module system is determined by
> extension regardless of the `package.json` type field — useful in mixed codebases.

## Language Context: css
# CSS Language Prompt Snippet

## Key Concepts

- **Selectors**: Element, class (`.name`), ID (`#name`), attribute (`[attr]`), and pseudo-class (`:hover`) targeting
- **Specificity**: Inline > ID > Class > Element cascade priority determining which rules win
- **Box Model**: `margin`, `border`, `padding`, `content` dimensions controlling element sizing
- **Flexbox**: `display: flex` with `justify-content`, `align-items` for one-dimensional layouts
- **Grid**: `display: grid` with `grid-template-columns/rows` for two-dimensional layouts
- **Custom Properties (Variables)**: `--name: value` with `var(--name)` for reusable design tokens
- **Media Queries**: `@media (max-width: ...)` for responsive design breakpoints
- **SCSS/Sass Features**: Nesting, `$variables`, `@mixin`, `@include`, `@extend`, `@use`, `@forward`
- **CSS Modules**: Scoped class names (`.module.css`) preventing global style collisions
- **Cascade Layers**: `@layer` for explicit control over cascade ordering

## Notable File Patterns

- `*.css` — Standard CSS stylesheets
- `*.scss` / `*.sass` — Sass/SCSS preprocessor files
- `*.less` — Less preprocessor files
- `*.module.css` / `*.module.scss` — CSS Modules (scoped styles)
- `globals.css` / `reset.css` / `normalize.css` — Global base styles
- `tailwind.config.js` — Tailwind CSS configuration (though a JS file)
- `variables.scss` / `_variables.scss` — Design token definitions

## Edge Patterns

- CSS files are `related` to the HTML or component files that import them for styling
- SCSS partial files (`_*.scss`) are `depends_on` by the main stylesheet that `@use`s them
- CSS variable definition files are `related` to all stylesheets that reference those variables
- CSS Modules are `related` to the component files that import them

## Summary Style

> "Global stylesheet defining CSS custom properties for the design system color palette and typography."
> "Responsive layout styles with flexbox and grid for the dashboard page across 3 breakpoints."
> "SCSS partial defining shared mixins for spacing, shadows, and media query breakpoints."

## Language Context: html
# HTML Language Prompt Snippet

## Key Concepts

- **Semantic Elements**: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>` for meaningful structure
- **Document Structure**: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` forming the page skeleton
- **Forms**: `<form>`, `<input>`, `<select>`, `<textarea>` for user data collection with validation attributes
- **Accessibility**: `aria-*` attributes, `role`, `alt` text, and semantic markup for screen readers
- **Meta Tags**: `<meta>` for viewport, charset, description, Open Graph, and SEO metadata
- **Script and Style Loading**: `<script>`, `<link>`, `<style>` for JavaScript and CSS inclusion
- **Data Attributes**: `data-*` custom attributes for storing element-specific data
- **Template Syntax**: Framework-specific templating (`{{ }}` for Jinja/Django, `<%= %>` for ERB)
- **Web Components**: `<template>`, `<slot>`, Custom Elements for encapsulated reusable components

## Notable File Patterns

- `index.html` — Application entry point or SPA shell
- `*.html` / `*.htm` — Static HTML pages
- `templates/**/*.html` — Server-side template files (Django, Jinja2, Go templates)
- `public/index.html` — SPA root document (React, Vue)
- `*.ejs` / `*.hbs` / `*.pug` — Templating engine files

## Edge Patterns

- HTML files `depends_on` JavaScript and CSS files they include via `<script>` and `<link>` tags
- Template HTML files `depends_on` the server-side code that renders them
- HTML entry points are `deploys` targets for build systems and web servers
- HTML files `related` to the components or routes they render

## Summary Style

> "Single-page application shell with viewport meta, CSS reset, and React root mount point."
> "Server-rendered template with navigation, content area, and footer using Django template inheritance."
> "Static landing page with responsive layout, form, and third-party script integrations."

## Language Context: json
# JSON Language Prompt Snippet

## Key Concepts

- **Strict Syntax**: No trailing commas, no comments (unlike JSONC or JSON5), double-quoted strings only
- **Data Types**: Objects, arrays, strings, numbers, booleans, and null — no undefined or date types
- **Nested Structure**: Arbitrary nesting depth for hierarchical configuration or data
- **Schema Validation**: JSON Schema (`$schema` keyword) for validating structure and types
- **JSONC**: JSON with Comments variant used by VS Code, tsconfig.json, and other tooling
- **JSON5**: Extended JSON allowing comments, trailing commas, unquoted keys, and more
- **JSON Lines** (`.jsonl`): One JSON object per line for streaming data processing

## Notable File Patterns

- `package.json` — Node.js project manifest with dependencies, scripts, and metadata
- `tsconfig.json` — TypeScript compiler configuration (actually JSONC)
- `.eslintrc.json` — ESLint linting rules and configuration
- `*.schema.json` — JSON Schema definitions for validation
- `composer.json` — PHP Composer project manifest
- `appsettings.json` — .NET application configuration
- `manifest.json` — Browser extension or PWA manifest

## Edge Patterns

- `package.json` `configures` the build toolchain and defines project dependencies
- `tsconfig.json` `configures` TypeScript compilation for all `.ts` files
- JSON Schema files `defines_schema` for API request/response validation
- Config JSON files `configures` the runtime behavior of the application

## Summary Style

> "Node.js project manifest defining N dependencies, build scripts, and project metadata."
> "TypeScript compiler configuration enabling strict mode with path aliases for monorepo packages."
> "JSON Schema defining the request/response structure for the user API endpoint."

## Language Context: markdown
# Markdown Language Prompt Snippet

## Key Concepts

- **Heading Hierarchy**: `#` through `######` for document structure, with h1 as the title
- **Front Matter**: YAML metadata between `---` delimiters at the top of the file
- **Fenced Code Blocks**: Triple backticks with optional language identifier for syntax highlighting
- **Reference-Style Links**: `[text][ref]` with `[ref]: url` definitions, useful for repeated URLs
- **Tables**: Pipe-delimited columns with alignment markers (`:---`, `:---:`, `---:`)
- **Admonitions**: Blockquote-based callouts (`> **Note:**`, `> **Warning:**`) for emphasis
- **Task Lists**: `- [ ]` and `- [x]` for checklists in issue trackers and READMEs
- **HTML Embedding**: Raw HTML allowed inline for features Markdown does not support natively

## Notable File Patterns

- `README.md` — Project overview and entry point for new contributors (high-value)
- `CONTRIBUTING.md` — Contribution guidelines, code style, PR process
- `CHANGELOG.md` — Version history following Keep a Changelog or similar format
- `docs/**/*.md` — Documentation directory with guides, API references, tutorials
- `*.md` in source directories — Co-located documentation for modules or packages
- `ADR-*.md` or `adr/*.md` — Architecture Decision Records

## Edge Patterns

- Markdown files `documents` the code components they describe or reference
- Links to other `.md` files create `related` edges between documentation nodes
- Code block references mentioning file paths may imply `documents` edges to those files
- README files in subdirectories typically `documents` the module at that path

## Summary Style

> "Project overview documentation with N sections covering installation, usage, and API reference."
> "Architecture Decision Record documenting the choice of [technology] for [purpose]."
> "Contributing guide with code style rules, testing requirements, and pull request process."

## Framework: react
# React Framework Addendum

> Injected into file-analyzer and architecture-analyzer prompts when React is detected.
> Do NOT use as a standalone prompt — always appended to the base prompt template.

## React Project Structure

When analyzing a React project, apply these additional conventions on top of the base analysis rules.

### Canonical File Roles

| File / Pattern | Role | Tags |
|---|---|---|
| `src/App.tsx` | Root application component — mounts providers, router, and top-level layout | `entry-point`, `ui` |
| `components/*.tsx`, `components/**/*.tsx` | Reusable UI components | `ui` |
| `hooks/*.ts`, `hooks/*.tsx` | Custom React hooks — encapsulate reusable stateful logic | `service`, `utility` |
| `contexts/*.tsx`, `context/*.tsx` | React Context providers and consumers — shared state across component tree | `service`, `state` |
| `pages/*.tsx`, `views/*.tsx` | Page-level components mapped to routes | `ui`, `routing` |
| `utils/*.ts`, `helpers/*.ts` | Pure utility functions — formatting, validation, transformations | `utility` |
| `types/*.ts`, `types/*.d.ts` | TypeScript type definitions and interfaces | `type-definition` |
| `services/*.ts`, `api/*.ts` | API client functions and data-fetching logic | `service` |
| `store/*.ts`, `slices/*.ts` | State management (Redux, Zustand, etc.) | `service`, `state` |
| `constants/*.ts` | Application-wide constants and enums | `config` |
| `__tests__/*.tsx`, `*.test.tsx`, `*.spec.tsx` | Unit and integration tests | `test` |

### Edge Patterns to Look For

**Component composition** — When a parent component renders a child component in its JSX return, create `contains` edges from the parent to the child. These edges represent the component tree hierarchy.

**Hook usage** — When a component or hook imports and calls a custom hook (`useX`), create `depends_on` edges from the consumer to the hook module. Hooks are the primary mechanism for shared logic in React.

**Context provider/consumer** — When a Context provider wraps components, create `publishes` edges from the provider to the context definition. When components call `useContext` or use a custom context hook, create `subscribes` edges from the consumer to the context.

**Props drilling chains** — When props are passed through multiple component layers without being used, create `depends_on` edges along the chain to surface the coupling depth.

### Architectural Layers for React

Assign nodes to these layers when detected:

| Layer ID | Layer Name | What Goes Here |
|---|---|---|
| `layer:ui` | UI Layer | `components/`, `pages/`, `views/`, layout components |
| `layer:service` | Service Layer | `hooks/`, `contexts/`, `services/`, `api/`, `store/` |
| `layer:types` | Types Layer | `types/`, shared TypeScript interfaces and type definitions |
| `layer:utility` | Utility Layer | `utils/`, `helpers/`, pure functions |
| `layer:config` | Config Layer | `App.tsx`, router configuration, provider setup, constants |
| `layer:test` | Test Layer | `__tests__/`, `*.test.tsx`, `*.spec.tsx` |

### Notable Patterns to Capture in languageLesson

- **Component composition over inheritance**: React favors composing components via props and children rather than class inheritance hierarchies
- **Custom hooks for reusable logic**: Hooks prefixed with `use` extract stateful logic into shareable modules without changing the component tree
- **React.memo for performance**: Components wrapped in `React.memo` skip re-renders when props are unchanged — indicates performance-sensitive paths
- **Controlled vs. uncontrolled components**: Controlled components derive state from props; uncontrolled components manage internal state via refs
- **Render props pattern**: Components that accept a function as children or a render prop to delegate rendering decisions to the consumer

