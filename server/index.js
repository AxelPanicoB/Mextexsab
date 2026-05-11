import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Metexsab API está en línea' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});
