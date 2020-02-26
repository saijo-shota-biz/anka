import shortid from 'shortid';

export function genId(): string {
  return shortid.generate();
}

export function getSelectionColor(index: number): string {
  return [
    '#42A5F5',
    '#26A69A',
    '#EC407A',
    '#D4E157',
    '#FFA726',
 ][index];
}
