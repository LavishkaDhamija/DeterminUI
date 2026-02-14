import express from 'express';
import cors from 'cors';
import planRoutes from './routes/plan.js';
import explainRoutes from './routes/explain.js';
import generateRoutes from './routes/generate.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Mount routes
app.use('/plan', planRoutes);
app.use('/explain', explainRoutes);
app.use('/generate', generateRoutes);

app.get('/', (req, res) => {
    res.send('DeterminUI Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
