import { Router } from 'express';
import { authenticate, requireActive, requireRole } from '../middleware/auth.js';

export const eventsRouter = Router();

// GET /api/events (public)
eventsRouter.get('/', async (req, res) => {
  // TODO: Phase 2 - list events
  res.status(501).json({ error: 'Not implemented' });
});

// GET /api/events/:id (public)
eventsRouter.get('/:id', async (req, res) => {
  // TODO: Phase 2 - get single event
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/events
eventsRouter.post('/', authenticate, requireRole('super_admin', 'admin', 'pastor', 'staff'), async (req, res) => {
  // TODO: Phase 2 - create event
  res.status(501).json({ error: 'Not implemented' });
});

// POST /api/events/:id/rsvp
eventsRouter.post('/:id/rsvp', authenticate, requireActive, async (req, res) => {
  // TODO: Phase 2 - RSVP to event
  res.status(501).json({ error: 'Not implemented' });
});

// DELETE /api/events/:id/rsvp
eventsRouter.delete('/:id/rsvp', authenticate, requireActive, async (req, res) => {
  // TODO: Phase 2 - cancel RSVP
  res.status(501).json({ error: 'Not implemented' });
});
