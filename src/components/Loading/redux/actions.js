const base = 'loading.action:';

export const SHOW_LOADING = `${base}show_loading`;

export function showLoading() {
  return {
    type: SHOW_LOADING,
    isLoading: 1,
  };
}

export function hideLoading() {
  return {
    type: SHOW_LOADING,
    isLoading: -1,
  };
}
