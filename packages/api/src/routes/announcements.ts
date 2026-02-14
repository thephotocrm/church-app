import { Router } from 'express';
import { requireActive, requireRole } from '../middleware/auth.js';
import { broadcastLimiter } from '../middleware/rateLimit.js';

export const announcementsRouter = Router();

// GET /api/announcements
announcementsRouter.get('/', requireActive, async (req, res) => {
  // TODO: Phase 1 - list announcements (paginated)
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/announcements
announcementsRouter.post(
  '/',
  requireRole('super_admin', 'admin', 'pastor'),
  broadcastLimiter,
  async (req, res) => {
    // TODO: Phase 1 - create announcement / broadcast
    res.status(501).json({ error: 'Not implemented' });
  }
);

// DELETE /api/announcements/:id
announcementsRouter.delete('/:id', requireRole('super_admin', 'admin'), async (req, res) => {
  // TODO: Phase 1 - delete announcement
  res.status(501).json({ error: 'Not implemented' });
});
