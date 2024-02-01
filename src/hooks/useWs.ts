import { useContext } from "solid-js";
import { createStore } from "solid-js/store";

import WS from "../config/ws";
import { IMessageOut } from "../types/ws";
import { RoomContext } from "../contexts/RoomContext";

export const useWS = () => {
  const [_, { updateRoom, updateUser }] = useContext(RoomContext);

  const [votes, setVotes] = createStore([]);

  WS.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("🚀 ~ WS.addEventListener ~ data:", data)

    if (data.type === "vote") {
      setVotes(votes.length, data)
      return
    };

    if (data.type === "room" && updateRoom) {
      updateRoom(data.room);
      return
    };

    if (data.type === "session" && updateUser) {
      updateUser(data.userId);
      return
    };

    if (data.type === "clear") {
      setVotes([]);
      return
    };
  });

  const sendMessage = (msg: IMessageOut) => {
    WS.send(JSON.stringify(msg));
  };

  return { sendMessage, votes };
};
