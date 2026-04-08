# Flashbots MEV-Share Client

## Latest Summary

Updated: 2026-04-05

- The client now uses the built-in `fetch` API instead of `axios`.
- Tooling dependencies were upgraded and vulnerable transitive dependencies were moved to patched releases.
- `ethers` now targets `^6.16.0`, and the repo is currently clean under `npm audit`.

See [CHANGELOG.md](./CHANGELOG.md) for the full dated change history.

Client library for MEV-Share written in Typescript.

Based on [MEV-Share Spec](https://github.com/flashbots/mev-share).

## quickstart

Install from npm:

```sh
yarn add @chinzilla/mev-share-client
# or
npm i @chinzilla/mev-share-client
```

Alternatively, clone the library & build from source:

```sh
git clone https://github.com/Chinzillla/mev-share-client-ts
cd mev-share-client-ts
yarn install && yarn build
```

```sh
# in your project, assuming it has the same parent directory as mev-share-client-ts
yarn add ../mev-share-client-ts
```
