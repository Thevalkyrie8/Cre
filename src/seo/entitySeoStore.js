import { normalizePath } from './seoConfig.js';

// Retain entity data across late metadata fetches and component mount ordering.
let snapshot = null;
const listeners = new Set();
export const getEntitySeo = () => snapshot;
export const subscribeEntitySeo = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const publishEntitySeo = (kind, data) => {
  const path = data?.path || data?.pathname;
  if (!path) return;
  snapshot = { kind, path: normalizePath(path), data };
  listeners.forEach((listener) => listener());
};
