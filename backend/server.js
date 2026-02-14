import express from 'express';
import cors from 'cors';
import planRoutes from './routes/plan.js';
import explainRoutes from './routes/explain.js';
import generateRoutes from './routes/generate.js'; // Import generate route

const app = express();
const PORT = 3000; // Hardcoded port for now

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/plan', planRoutes);
app.use('/explain', explainRoutes);
app.use('/generate', generateRoutes); // Mount /generate

app.get('/', (req, res) => {
    res.send('DeterminUI Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
