export type RoomStatus = 'waiting' | 'in_game' | 'finished';

export interface Player {
  id: string;
  name: string;
}

export interface RoomSettings {
  crazyMode: boolean; 
  maxPlayers: number;
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  players: Player[];
  status: RoomStatus;
  settings: RoomSettings;
  createdAt: Date;
}
