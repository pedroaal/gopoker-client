import { createMemo, createSignal, For, Show, useContext } from "solid-js";

import { IUser } from "../types/ws";
import { useWS } from "../hooks/useWs";
import { METRICS } from "../constants/game";
import { WS_ACTIONS } from "../constants/ws";
import { RoomContext } from "../contexts/RoomContext";

import Select from "../components/Select";

const Vote = () => {
  const [store, _] = useContext(RoomContext);

  const { sendMessage, votes, clearVotes } = useWS();

  const options = createMemo(() => {
    if (!store.room?.id) return [];
    const current = METRICS.find((metric) => metric.id === store.room?.metric)?.value ?? [];
    return current.map((value) => ({ id: value, label: value }));
  });

  const hasVoted = (userId: string) => {
    return votes.some((vote) => vote.userId === userId);
  };

  const players = createMemo(() => {
    if (!store.room?.users) return [];
    const users = store.room.users.map((user: IUser) => ({ ...user, hasVoted: hasVoted(user.id) }));
    console.log("🚀 ~ players ~ users:", users)
    return users;
  });

  const vote = (value: number) => {
    sendMessage({
      action: WS_ACTIONS.VOTE,
      content: `${value}`,
      userId: store.userId,
    });
  };

  const clearVotes = (value: number) => {
    sendMessage({
      action: WS_ACTIONS.CLEAR,
    });
  };

  return (
    <Show when={store.hasRoom}>
      <div class="flex gap-4">
        <div class='w-full md:w-2/3 flex flex-col gap-4'>
          <div class="flex gap-4">
            <For each={votes}>
              {(vote) => (
                <div class="card h-24 w-16 flex justify-center items-center border">
                  <span>
                    {vote.content}
                  </span>
                </div>
              )}
            </For>
          </div>
          <div class="flex gap-4">
            <For each={options()}>
              {(option) => (
                <button class="card size-10 flex justify-center items-center border" onClick={() => vote(option.id)} disabled={hasVoted(store.userId)}>
                  {option.label}
                </button>
              )}
            </For>
          </div>
        </div>
        <div class="w-full md:w-1/3 flex flex-col gap-4">
          <ul>
            <For each={players()}>
              {(player) => (
                <li>{player.name} {player.hasVoted && <span>(voted)</span>}</li>
              )}
            </For>
          </ul>
          <button class="btn btn-primary" onClick={clearVotes}>Clear votes</button>
        </div>
      </div>
    </Show >
  );
};

export default Vote;
