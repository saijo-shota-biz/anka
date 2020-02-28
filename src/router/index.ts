import Vue from 'vue';
import VueRouter from 'vue-router';
import List from '../views/List.vue';
import Create from '../views/Create.vue';
import Question from '../views/Question.vue';
import Result from '../views/Result.vue';
import Confirm from '../views/Confirm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List',
    component: List,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
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
