import express from 'express';
import { connect } from 'mongoose';
import pkg from 'body-parser';
const { json } = pkg;

import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from './routes/auth.js';
const port = 3000

config();
const app = express();

app.use(cors());
app.use(json());

connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB ✅ !'))
    .catch((error) => console.error('Erreur de connexion MongoDB :', error));

app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`));
