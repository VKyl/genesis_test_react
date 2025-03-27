export interface ClientToServerEvents {
  hello: () => void;
}
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export const DB_LINK: string = process.env.DB_LINK || "mongodb://mongodb:27017/genesis-test"