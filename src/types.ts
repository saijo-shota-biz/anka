export interface Question {
  content: string;
  selects: Select[];
  answer: string[];
}

export interface Select {
  id: string;
  value: string;
  color: string;
}
