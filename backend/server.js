import express from 'express';
import cors from 'cors';
import planRoutes from './routes/plan.js';

const app = express();
const PORT = 3000; // Hardcoded port for now

app.use(cors());
app.use(express.json());

// Mount the plan route
app.use('/plan', planRoutes);

app.get('/', (req, res) => {
    res.send('DeterminUI Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
