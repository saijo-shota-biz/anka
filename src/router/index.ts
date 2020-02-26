import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Question from '../views/Question.vue';
import Result from '../views/Result.vue';
import Confirm from '../views/Confirm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/confirm/:id',
    name: 'Confirm',
    component: Confirm,
    props: true,
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: Question,
    props: true,
  },
  {
    path: '/result/:id',
    name: 'Result',
    component: Result,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
