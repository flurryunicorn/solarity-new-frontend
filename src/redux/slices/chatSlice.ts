import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTIONS from "config/actions";

export interface CounterState {
  roomName: string;
  userName: string;
  modelIndex: Number;
  socket: Object;
  peers: any[];
  rooms: any[];
  msgs: any[];
  selectedIndex: number;
  selectedRoom: Object;   // Select a room to create
  newRoomTitle: string;    // Room name to create
  newModelIndex: number;    //New model index
  createModalVisibility: boolean;
  joinModalVisibility: boolean;
  activeRoomTypeIndex: number;
}

const initialState: CounterState = {
  roomName: '',
  userName: '',
  modelIndex: 0,
  socket: {},
  peers: [],
  rooms: [],
  msgs: [],
  selectedIndex: -1,
  selectedRoom: {},
  newRoomTitle: "",
  newModelIndex: 0,
  createModalVisibility: false,
  joinModalVisibility: false,
  activeRoomTypeIndex: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createRoom: (state, action: PayloadAction<any>) => {
      state.roomName = action.payload.roomName;
      state.userName = action.payload.userName;
      state.modelIndex = action.payload.modelIndex;
      localStorage.setItem('roomName', action.payload.roomName);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('name', action.payload.userName);
      localStorage.setItem('modelIndex', action.payload.modelIndex);
      if (!!(window as any).socket) {
        console.log(action.payload);
        (window as any).socket.emit(ACTIONS.JOIN, { roomId: -1, user: { name: state.userName, title: action.payload.title, type: action.payload.type, roomNo: action.payload.roomNo, roomName: state.roomName, modelIndex: state.modelIndex, imageUrl: action.payload.imageUrl } });
      }
    },
    setRoom: (state, action: PayloadAction<any>) => {
      state.roomName = action.payload.roomName;
      state.userName = action.payload.userName;
      state.modelIndex = action.payload.modelIndex;
      localStorage.setItem('roomName', action.payload.roomName);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('name', action.payload.userName);
      localStorage.setItem('modelIndex', action.payload.modelIndex);
    },
    setName(state, action: PayloadAction<any>) {
      localStorage.setItem('name', action.payload);
      state.userName = action.payload;
    },
    setSocket(state, action: PayloadAction<any>) {
      state.socket = action.payload;
    },
    addPeer(state, action: PayloadAction<any>) {
      state.peers.push(action.payload);
    },
    addRoom(state, action: PayloadAction<any>) {
      state.rooms.push(action.payload);
    },
    setRooms(state, action: PayloadAction<any>) {
      state.rooms = action.payload;
    },
    addMsg(state, action: PayloadAction<any>) {
      state.msgs.push(action.payload);
    },
    removePeer(state, action: PayloadAction<any>) {
      var peerindex = state.peers.findIndex((s: any) => s.name === action.payload.name);
      if (peerindex !== -1)
        state.peers.splice(peerindex, 1);
    },
    setMsg(state, action: PayloadAction<any>) {
      state.msgs = action.payload;
    },
    setPeers(state, action: PayloadAction<any>) {
      state.peers = action.payload;
    },
    setRoomIndex(state, action: PayloadAction<any>) {
      state.selectedIndex = action.payload;
    },
    setModel(state, action: PayloadAction<any>) {
      state.modelIndex = action.payload;
    },
    setSelectedRoom(state, action: PayloadAction<any>) {
      state.selectedRoom = action.payload;
    },
    setCreateModalVisibility(state, action: PayloadAction<any>) {
      state.createModalVisibility = action.payload;
    },
    setJoinModalVisibility(state, action: PayloadAction<any>) {
      state.joinModalVisibility = action.payload;
    },
    setNewRoomTitle(state, action: PayloadAction<any>) {
      state.newRoomTitle = action.payload;
    },
    setActiveRoomTypeIndex(state, action: PayloadAction<number>) {
      state.activeRoomTypeIndex = action.payload;
    },
    setNewModelIndex(state, action: PayloadAction<number>) {
      state.newModelIndex = action.payload;
    }
  },
});

export const { setCreateModalVisibility, setJoinModalVisibility, createRoom, setName, setSelectedRoom, setNewRoomTitle, setNewModelIndex, setActiveRoomTypeIndex, setSocket, addPeer, addRoom, setRooms, addMsg, removePeer, setMsg, setRoomIndex, setModel, setPeers, setRoom } = chatSlice.actions;

export default chatSlice.reducer;
