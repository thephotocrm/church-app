import { useState, useEffect, useCallback } from 'react';
import type { Recording } from '@church-app/shared';
import { api } from '../services/api';

const PAGE_SIZE = 12;

export function useRecordings() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (offset: number) => {
    const data = await api.getRecordings(PAGE_SIZE, offset);
    return data;
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPage(0);
      setRecordings(data.items);
      setTotal(data.total);
    } catch {
      setError('Could not load recordings');
    } finally {
      setLoading(false);
    }
  }, [fetchPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const hasMore = recordings.length < total;

  async function loadMore() {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await fetchPage(recordings.length);
      setRecordings((prev) => [...prev, ...data.items]);
      setTotal(data.total);
    } catch {
      // silently fail load-more
    } finally {
      setLoadingMore(false);
    }
  }

  return { recordings, loading, loadingMore, error, hasMore, loadMore, refetch };
}
