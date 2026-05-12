# Changelog

All notable changes to this project will be documented in this file.

This project follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format and [Semantic Versioning](https://semver.org/).

## Latest Summary

Date: 2026-05-12

Summary: Documentation and portfolio-readiness refresh on top of the recent security and dependency maintenance work. The README now presents the library's capabilities, requirements, supported networks, usage examples, development workflow, and maintenance status clearly for technical reviewers. The dependency refresh remains documented below: the library uses the built-in `fetch` API, the lint and release tooling were upgraded, vulnerable transitive dependencies were moved to patched versions in both lockfiles, and `npm audit` is currently clean.

## [Unreleased]

### Changed

- Aligned `package-lock.json` root package metadata with `package.json` during lockfile regeneration.
- Replaced `axios` with the built-in `fetch` API in the client implementation and examples-facing documentation.
- Updated the package guidance to require Node.js 18+ unless the consuming runtime provides a compatible global `fetch`.
- Upgraded the lint stack to support `eslint-plugin-tsdoc@0.5.2`, alongside compatible `eslint` and `@typescript-eslint` versions.
- Upgraded `ethers` to `^6.16.0` in both `devDependencies` and `peerDependencies` so the dependency tree resolves patched `ws@8.17.1`.
- Refreshed release tooling with `release-it@19.2.4`.

### Security

- Added Yarn `resolutions` for vulnerable transitive dependencies in the lint and release tooling trees: `ajv`, `brace-expansion`, `cross-spawn`, `diff`, `flatted`, `js-yaml`, `minimatch`, and `undici`.
- Added npm `overrides` for transitive dependencies that also needed to be fixed in `package-lock.json`: `diff`, `flatted`, `js-yaml`, and `undici`.
- Added npm `overrides` and Yarn `resolutions` for newly reported transitive dev-tooling advisories in `basic-ftp`, `fast-uri`, and `ip-address`.
- Regenerated both `yarn.lock` and `package-lock.json` so Yarn and npm resolve the same patched dependency set.

### Documentation

- Replaced the ad hoc upgrade notes in the README with a short dated summary and a link to this changelog.
- Expanded the README into a public-facing project overview with installation, quick-start usage, event stream usage, private transaction submission, supported networks, local development scripts, and maintenance notes.
- Updated the latest documentation summary date to 2026-05-12 so portfolio viewers can see the README and changelog were reviewed together.
