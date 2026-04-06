## Upgrades

- The client now uses the built-in `fetch` API instead of `axios`, which removes an extra runtime dependency and its vulnerable transitive `form-data` path.
- The release tooling has been refreshed to clear the remaining critical advisory in the dependency tree.
- Use Node.js 18+ when consuming the package, or provide a compatible global `fetch` implementation in older runtimes. Repository tooling follows the Node version pinned in `.nvmrc`.
- The lint stack now supports `eslint-plugin-tsdoc@0.5.2`, with matching `eslint` and `@typescript-eslint` versions. This change was made to remove the older vulnerable `@microsoft/tsdoc-config -> ajv` path while keeping TSDoc validation working.
- The legacy ESLint dependency subtree now resolves `ajv@6.14.0`, `minimatch@3.1.4`, and `brace-expansion@1.1.13`. This change was made because those packages were only present transitively in the older lint tooling, so targeted resolutions fixed the advisories without a larger migration away from ESLint 8.
- `cross-spawn` now resolves to `7.0.6` across the dependency tree. This change was made because the hoisted `7.0.3` copy used by `eslint` and `release-it` was affected by the ReDoS advisory, and upgrading the shared transitive dependency removed that risk without changing application code.
- `diff` now resolves to `4.0.4` for the `ts-node` toolchain. This change was made because `ts-node` still depends on the `^4.0.1` range, and pinning the patched transitive release removes the `parsePatch` / `applyPatch` DoS issue without changing how the examples are run.
- `flatted` now resolves to `3.4.2` in the legacy ESLint cache stack. This change was made because `flat-cache` was still pulling an older vulnerable `flatted` release, and pinning the patched transitive version removes the parse-time DoS and prototype-pollution issues without affecting library runtime behavior.
