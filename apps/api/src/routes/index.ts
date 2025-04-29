import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Sample API endpoints
router.get('/users', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ]);
});

router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id <= 0 || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  res.json({ id, name: `User ${id}` });
});

export default router;
