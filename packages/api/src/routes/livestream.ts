import { Router } from 'express';
import { requireActive, requireRole } from '../middleware/auth.js';

export const livestreamRouter = Router();

// GET /api/livestream/current
livestreamRouter.get('/current', requireActive, async (req, res) => {
  // TODO: Phase 4 - get current/upcoming livestream config
  res.status(501).json({ error: 'Not implemented' });
});

// PUT /api/livestream/config
livestreamRouter.put(
  '/config',
  requireRole('super_admin', 'admin', 'pastor'),
  async (req, res) => {
    // TODO: Phase 4 - update livestream configuration
    res.status(501).json({ error: 'Not implemented' });
  }
);
