import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import { Question } from './types';

const QUESTIONS = 'questions';

export function initialize() {
  firebase.initializeApp({
    apiKey: 'AIzaSyA_0mkbOUFzH6h3ZTGZMpO327oZfN78m4w',
    authDomain: 'anka-ddb39.firebaseapp.com',
    projectId: 'anka-ddb39',
    appId: '1:990739489602:web:a73c6d2291b1d35b575edb',
    measurementId: 'G-E9MWJC0TPX',
  });
  firebase.analytics();
}

export function addQuestion(question: Question): Promise<string> {
  const db = firebase.firestore();
  return db.collection(QUESTIONS).add(question)
    .then((docRef) => docRef.id);
}

export function getQuestion(id: string): Promise<Question> {
  const db = firebase.firestore();
  return db.collection(QUESTIONS).doc(id).get()
    .then((doc) => doc.data() as Question);
}

export function addAnswer(questionId: string, answer: string[]) {
  const db = firebase.firestore();
  db.collection(QUESTIONS).doc(questionId).update({answer});
}

export function getQuestionDocRef(id: string): firebase.firestore.DocumentReference {
  const db = firebase.firestore();
  return db.collection(QUESTIONS).doc(id);
}
