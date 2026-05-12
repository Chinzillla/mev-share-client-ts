# Flashbots MEV-Share Client

TypeScript client library for the [Flashbots MEV-Share](https://github.com/flashbots/mev-share) API.

This package provides a typed wrapper around private transaction submission, MEV-Share bundle submission and simulation, Server-Sent Events stream handling, and event history lookups across supported Flashbots networks.

## Project Status

Updated: 2026-05-12

- Published package: `@chinzilla/mev-share-client`
- Current version: `0.0.1`
- Runtime target: Node.js 18+ for built-in `fetch`; this repo currently pins Node.js `v22.0.0` in `.nvmrc`
- Ethereum dependency: `ethers@^6.16.0`
- Security posture: npm and Yarn lockfiles were refreshed with patched transitive dependencies; see [CHANGELOG.md](./CHANGELOG.md)

## Highlights

- Typed client methods for `eth_sendPrivateTransaction`, `mev_sendBundle`, and `mev_simBundle`
- Network presets for Ethereum mainnet, Sepolia, and Holesky
- Event stream helpers for pending MEV-Share transactions and bundles
- Event history helpers for inspecting previously broadcast stream events
- Strict TypeScript build with declaration and source map output
- CI workflow that installs dependencies, builds the package, and runs linting
- Dependency maintenance documented through npm `overrides`, Yarn `resolutions`, and the changelog

## Installation

```sh
yarn add @chinzilla/mev-share-client ethers
```

```sh
npm i @chinzilla/mev-share-client ethers
```

`ethers` is a peer dependency so consuming projects can control their Ethereum stack version.

## Quick Start

```ts
import { JsonRpcProvider, Wallet } from "ethers"
import MevShareClient from "@chinzilla/mev-share-client"

const provider = new JsonRpcProvider(process.env.PROVIDER_URL)
const authSigner = Wallet.createRandom().connect(provider)

const mevshare = MevShareClient.useEthereumSepolia(authSigner)

const historyInfo = await mevshare.getEventHistoryInfo()
console.log(historyInfo)
```

Listen to pending MEV-Share transactions:

```ts
const events = mevshare.on("transaction", (pendingTx) => {
    console.log("pending tx", pendingTx.hash)
})

// Close the stream before shutting down your process.
events.close()
```

Submit a signed private transaction:

```ts
const txHash = await mevshare.sendTransaction(signedTx, {
    hints: {
        calldata: true,
        contractAddress: true,
        functionSelector: true,
    },
})

console.log(txHash)
```

## Supported Networks

| Network | Chain ID | Helper |
| --- | ---: | --- |
| Ethereum mainnet | `1` | `MevShareClient.useEthereumMainnet(authSigner)` |
| Sepolia | `11155111` | `MevShareClient.useEthereumSepolia(authSigner)` |
| Holesky | `17000` | `MevShareClient.useEthereumHolesky(authSigner)` |

You can also create a client from a chain ID:

```ts
const mevshare = MevShareClient.fromNetwork(authSigner, { chainId: 11155111 })
```

## Local Development

```sh
git clone https://github.com/chinzillla/mev-share-client-ts
cd mev-share-client-ts
yarn install
yarn build
yarn lint
```

Useful scripts:

| Command | Purpose |
| --- | --- |
| `yarn build` | Compile TypeScript into `build/` |
| `yarn lint` | Run ESLint over source files |
| `yarn example.tx` | Send a private transaction example |
| `yarn example.composableBundle` | Send a composable bundle example |
| `yarn example.backrun` | Run the backrun bundle example |
| `yarn example.history` | Read MEV-Share event history |

Example scripts expect a `src/examples/.env` file with:

```sh
AUTH_PRIVATE_KEY=
SENDER_PRIVATE_KEY=
PROVIDER_URL=
```

## Maintenance Notes

Recent maintenance replaced `axios` with the built-in `fetch` API, upgraded `ethers`, refreshed lint and release tooling, and patched vulnerable transitive dependencies in both `package-lock.json` and `yarn.lock`.

See [CHANGELOG.md](./CHANGELOG.md) for the full dated change history.
