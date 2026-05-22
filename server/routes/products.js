import { Router } from 'express';
import products from '../data/products.js';

const router = Router();

router.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  res.json(products);
});

export default router;
