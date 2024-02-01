import { Show, createSignal, useContext } from "solid-js";

import { useWS } from "../hooks/useWs";
import { METRICS } from "../constants/game";
import { WS_ACTIONS } from "../constants/ws";
import { RoomContext } from "../contexts/RoomContext";

import Input from "../components/Input";
import Select from "../components/Select";

const Room = () => {
  const [store, _] = useContext(RoomContext);
  const { sendMessage } = useWS();

  const [roomName, setRoomName] = createSignal("");
  const [metric, setMetric] = createSignal("");
  const [user, setUser] = createSignal("");
  const [roomId, setRoomId] = createSignal("");

  const createRoom = () => {
    sendMessage({
      action: WS_ACTIONS.CREATE,
      name: roomName(),
      metric: metric(),
      userName: user(),
    });
    setRoomName("");
    setMetric("");
    setUser("");
  };

  const joinRoom = () => {
    sendMessage({
      action: WS_ACTIONS.JOIN,
      roomId: roomId(),
      userName: user(),
    });
    setUser("");
    setRoomId("");
  };

  return (
    <Show when={!store.hasRoom} >
      <div class="flex flex-col gap-4">
        <Input label="User" value={user} onChange={setUser} />

        <div class="flex gap-4 items-end">
          <Select label='Metric' value={metric} onChange={setMetric} options={METRICS} />
          <Input label="Room name" value={roomName} onChange={setRoomName} />
          <button onClick={createRoom} class="btn btn-primary">
            Create
          </button>
        </div>

        <div class="flex gap-4 items-end">
          <Input label="Room id" value={roomId} onChange={setRoomId} />
          <button onClick={joinRoom} class="btn btn-primary">
            Join
          </button>
        </div>
      </div>
    </Show>
  );
};

export default Room;
