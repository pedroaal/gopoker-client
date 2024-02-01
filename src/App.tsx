import { Show } from "solid-js";

import { RoomProvider } from "./contexts/RoomContext";

import Room from "./pages/Room";
import Vote from "./pages/Vote";

const App = () => {
  return (
    <RoomProvider>
      <div class="container mx-auto">
        <header class="text-center">GOPOKER</header>
        <Room />
        <Vote />
      </div>
    </RoomProvider>
  );
};

export default App;
