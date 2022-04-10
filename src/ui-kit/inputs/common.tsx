export const enum InputState {
  initial = 'initial',
  fail = 'fail',
  attention = 'attention',
}

export interface InputInterface {
  state?: InputState;
}

export function getBorderData(state) {
  let borderWidth;
  let borderColor;
  if (state !== InputState.initial) {
    borderWidth = '1px';
    borderColor = state === InputState.fail ? 'error' : 'statusYellow';
  }
  return { borderWidth, borderColor };
}
