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

export const MY_QUESTIONS_KEY: string = 'anka-ddb39-myquestions';

export const MY_ANSERS_KEY: string = 'anka-ddb39-myanswers';
