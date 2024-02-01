import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

import { IRoom } from "../types/ws";

export const RoomContext = createContext([{
  room: {
    id: undefined,
    name: undefined,
    metric: undefined,
    users: []
  },
  userId: undefined,
  hasRoom: false,
}, {
  updateRoom: (newState: IRoom) => { },
  updateUser: (newUserId: string) => { },
}]);

interface IProps {
  children: any;
}

export const RoomProvider = (props: IProps) => {
  const [store, setStore] = createStore({
    room: {
      id: undefined,
      name: undefined,
      metric: undefined,
      users: []
    },
    userId: undefined,
    hasRoom: false,
  });

  const room = [
    store,
    {
      updateRoom(newRoom: IRoom) {
        setStore('room', () => { return newRoom });
        setStore('hasRoom', () => { return true });
      },
      updateUser(newUserId: string) {
        setStore('userId', () => { return newUserId });
      },
    },
  ];

  return (
    <RoomContext.Provider value={room}>
      {props.children}
    </RoomContext.Provider>
  );
}