const base = 'toast.action:';

export const TOAST = `${base}toast`;
export const TOAST_CLEAR = `${base}toastclear`;

export function toast(data) {
  return {
    type: TOAST,
    severity: 'error',
    ...data,
  };
}

export function toastClear() {
  return {
    type: TOAST_CLEAR,
  };
}
