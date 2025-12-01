import { randomUUID } from 'crypto';
import { Room, RoomSettings, Player } from '../domain/Room';

export class RoomService {
  private roomsByCode = new Map<string, Room>();

  createRoom(hostName: string, settings?: Partial<RoomSettings>): Room {
    const host: Player = {
      id: randomUUID(),
      name: hostName,
    };

    const room: Room = {
      id: randomUUID(),
      code: this.generateCode(),
      hostId: host.id,
      players: [host],
      status: 'waiting',
      settings: {
        crazyMode: true,
        maxPlayers: 4,
        ...settings,
      },
      createdAt: new Date(),
    };

    this.roomsByCode.set(room.code, room);
    return room;
  }

  joinRoom(code: string, playerName: string): Room {
    const room = this.roomsByCode.get(code.toUpperCase());
    if (!room) throw new Error('ROOM_NOT_FOUND');

    if (room.status !== 'waiting') throw new Error('ROOM_NOT_JOINABLE');

    if (room.players.length >= room.settings.maxPlayers) {
      throw new Error('ROOM_FULL');
    }

    const player: Player = {
      id: randomUUID(),
      name: playerName,
    };

    room.players.push(player);
    return room;
  }

  leaveRoom(code: string, playerId: string): Room | null {
    const room = this.roomsByCode.get(code.toUpperCase());
    if (!room) return null;

    room.players = room.players.filter(p => p.id !== playerId);

    if (room.players.length === 0) {
      this.roomsByCode.delete(code.toUpperCase());
      return null;
    }

    if (room.hostId === playerId) {
      room.hostId = room.players[0].id;
    }

    return room;
  }

  getRoom(code: string): Room | null {
    return this.roomsByCode.get(code.toUpperCase()) ?? null;
  }

  private generateCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
    }
    if (this.roomsByCode.has(code)) return this.generateCode();
    return code;
  }
}

export const roomService = new RoomService();