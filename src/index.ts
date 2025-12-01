import express from 'express';
import roomsRoutes from './routes/roomsRoutes';

const app = express();
app.use(express.json());

app.use('/rooms', roomsRoutes);

const PORT = process.env.PORT ?? 3030;
app.listen(PORT, () => {
  console.log(`Truco Maluco API rodando na porta ${PORT}`);
});