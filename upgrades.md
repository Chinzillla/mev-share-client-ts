## Upgrades

- The client now uses the built-in `fetch` API instead of `axios`, which removes an extra runtime dependency and its vulnerable transitive `form-data` path.
- The release tooling has been refreshed to clear the remaining critical advisory in the dependency tree.
- Use Node.js 18+ when consuming the package, or provide a compatible global `fetch` implementation in older runtimes. Repository tooling follows the Node version pinned in `.nvmrc`.
- The lint stack now supports `eslint-plugin-tsdoc@0.5.2`, with matching `eslint` and `@typescript-eslint` versions. This change was made to remove the older vulnerable `@microsoft/tsdoc-config -> ajv` path while keeping TSDoc validation working.
- The legacy ESLint dependency subtree now resolves `ajv@6.14.0`, `minimatch@3.1.4`, and `brace-expansion@1.1.13`. This change was made because those packages were only present transitively in the older lint tooling, so targeted resolutions fixed the advisories without a larger migration away from ESLint 8.
