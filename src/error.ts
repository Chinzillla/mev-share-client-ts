import { StreamEventType } from './api/interfaces'

class MevShareError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MevShareError";
    }
}

export class JsonRpcError extends MevShareError {
    constructor(error: {code: number, message: string}) {
        super(`${error.code}: ${error.message}`)
        this.name = `JsonRpcError: ${error.code}`
        this.message = error.message
    }
}

export class NetworkFailure extends MevShareError {
    constructor(message: string) {
        super(message)
        this.name = "NetworkFailure"
    }

    static fromResponse(status: number, responseBody: unknown): NetworkFailure {
        if (responseBody == null || responseBody === '') {
            return new NetworkFailure(`${status}`)
        }

        const details = typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody)
        return new NetworkFailure(`${status}: ${details}`)
    }

    static fromError(error: unknown): NetworkFailure {
        if (error instanceof Error) {
            return new NetworkFailure(`${error.message}\n${error.stack ?? ''}`.trim())
        }

        return new NetworkFailure(String(error))
    }
}

export class UnimplementedNetwork extends MevShareError {
    constructor({chainId}: {chainId: number}) {
        super(`Cannot infer network params from chainId: ${chainId}`)
        this.name = "UnimplementedNetwork"
    }
}

export class UnimplementedStreamEvent extends MevShareError {
    constructor(eventType: StreamEventType) {
        super(`Unimplemented stream event type: ${eventType.toString()}`)
        this.name = "UnimplementedStreamEvent"
    }
}

export default MevShareError
