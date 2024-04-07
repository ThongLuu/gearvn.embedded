const base = 'topbar.action:';

export const CONTROLLERS = `${base}controllers`;

export function controllers(leftItems = [], rightItems = []) {
  return {
    type: CONTROLLERS,
    leftItems,
    rightItems,
  };
}
