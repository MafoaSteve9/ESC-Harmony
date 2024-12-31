import { Router } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();


// Route pour l'inscription (Register)
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }
  
      // Hacher le mot de passe
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
  
      // Créer un nouvel utilisateur
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      // Sauvegarder dans la BDD
      await newUser.save();
  
      // Générer un token JWT
      const token = jwt.sign({ id: newUser._id }, 'SECRET_KEY', { expiresIn: '1h' });
  
      res.status(201).json({
        message: 'Utilisateur créé avec succès.',
        token,
        userId: newUser._id,
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  });

// Connexion
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

        const isPasswordValid = await compare(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Mot de passe incorrect.' });

        const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error });
    }
});

export default router;
