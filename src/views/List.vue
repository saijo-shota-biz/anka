<template>
  <Layout page-title="これまでに作った/答えた質問一覧" ref="layout">
    <div slot="content">
      <v-list subheader>
        <v-subheader>作った</v-subheader>

        <v-divider></v-divider>

        <template v-if="myQuestions.length > 0">
          <v-list-item
            v-for="question in myQuestions"
            :key="`${question.id}-q`"
            @click="$router.push({ name: 'Result', params: { id: question.id } })"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-badge v-if="question.answer.length > 0" color="teal" :content="question.answer.length">{{ question.content }}</v-badge>
                <div v-else>{{ question.content }}</div>
              </v-list-item-title>
            
            </v-list-item-content>

          </v-list-item>
        </template>

        <template v-else>
          <v-list-item @click="$router.push({ name: 'Create' })">
            <v-list-item-content>
              <v-list-item-title>作った質問がないよ。<br>質問を作ってみよう。</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-subheader>答えた</v-subheader>

        <v-divider></v-divider>

        <template v-if="myAnswers.length > 0">
          <v-list-item
            v-for="answer in myAnswers"
            :key="`${answer.id}-a`"
            @click="$router.push({ name: 'Result', params: { id: answer.id } })"
          >
            <v-list-item-content>
              <v-list-item-title v-text="answer.content"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

        <template v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>答えた質問はないよ。</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
    <v-btn slot="actions" color="primary" block :to="{ name: 'Create' }">質問をつくる</v-btn>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import { MY_QUESTIONS_KEY, MY_ANSERS_KEY } from '@/helpers.ts';
import { getQuestions } from '@/firebase.ts';
import { Question } from '@/types';

@Component({
  components: {
    Layout,
  },
})
export default class List extends Vue {

  private myQuestions: Question[] = [];
  private myAnswers: Question[] = [];

  private created() {
    const myQuestionsJson = localStorage.getItem(MY_QUESTIONS_KEY) || '[]';
    const myQuestions: string[] = JSON.parse(myQuestionsJson);

    const myAnswersJson = localStorage.getItem(MY_ANSERS_KEY) || '[]';
    const myAnswers: string[] = JSON.parse(myAnswersJson);

    getQuestions(myQuestions)
      .then((questions) => {
        this.myQuestions = questions || [];
      });
    getQuestions(myAnswers)
      .then((questions) => {
        this.myAnswers = questions || [];
      });
  }
}
</script>
