import { Router } from 'express';
import { roomService } from '../services/RoomService';

const router = Router();

router.post('/', (req, res) => {
  const { hostName, settings } = req.body;

  if (!hostName) {
    return res.status(400).json({ error: 'hostName is required' });
  }

  try {
    const room = roomService.createRoom(hostName, settings);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

router.post('/:code/join', (req, res) => {
  const { code } = req.params;
  const { playerName } = req.body;

  if (!playerName) {
    return res.status(400).json({ error: 'playerName is required' });
  }

  try {
    const room = roomService.joinRoom(code, playerName);
    res.json(room);
  } catch (err: any) {
    if (err.message === 'ROOM_NOT_FOUND') {
      return res.status(404).json({ error: 'ROOM_NOT_FOUND' });
    }
    if (err.message === 'ROOM_NOT_JOINABLE') {
      return res.status(400).json({ error: 'ROOM_NOT_JOINABLE' });
    }
    if (err.message === 'ROOM_FULL') {
      return res.status(400).json({ error: 'ROOM_FULL' });
    }
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

router.post('/:code/leave', (req, res) => {
  const { code } = req.params;
  const { playerId } = req.body;

  if (!playerId) {
    return res.status(400).json({ error: 'playerId is required' });
  }

  const room = roomService.leaveRoom(code, playerId);
  if (!room) {
    return res.status(204).send(); // room deletada
  }

  res.json(room);
});

router.get('/:code', (req, res) => {
  const { code } = req.params;
  const room = roomService.getRoom(code);
  if (!room) return res.status(404).json({ error: 'ROOM_NOT_FOUND' });
  res.json(room);
});

export default router;