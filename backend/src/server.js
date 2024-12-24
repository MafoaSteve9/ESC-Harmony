const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const port = 3000

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB ✅ !'))
    .catch((error) => console.error('Erreur de connexion MongoDB :', error));

app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`));
