import { makeReconnectingWS } from "@solid-primitives/websocket";

const WS_URL = import.meta.env.VITE_WS_HOST as string;

const WS = makeReconnectingWS(`ws://${WS_URL}/ws`);

export default WS