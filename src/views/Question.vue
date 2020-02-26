<template>
  <Layout :page-title="question.content">
    <v-form slot="content">
      <v-radio-group v-model="selected">
        <v-radio :color="select.color" v-for="select in question.selects" :key="select.id" :label="select.value" :value="select.id"></v-radio>
      </v-radio-group>
    </v-form>

    <v-btn slot="actions" block color="primary" @click="answer">回答する</v-btn>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import { getQuestion, addAnswer } from '@/firebase.ts';
import { Question as Q } from '@/types.ts';
import router from '@/router';

@Component({
  components: {
    Layout,
  },
})
export default class Question extends Vue {

  @Prop()
  private id!: string;

  private selected: string = '';

  private question: Q|null = null;

  private answer() {
    const answers: string[] = [];
    if (this.question) {
      this.question.answer.forEach((a) => answers.push(a));
    }
    answers.push(this.selected);
    addAnswer(this.id, answers);


    const json: string = localStorage.getItem('anka-ddb39') || '[]';
    const ids: string[] = JSON.parse(json);
    ids.push(this.id);
    localStorage.setItem('anka-ddb39', JSON.stringify(ids));

    router.push({ name: 'Result', params: { id: this.id } });
  }

  private async created() {
    const json: string = localStorage.getItem('anka-ddb39') || '[]';
    const ids: string[] = JSON.parse(json);
    if (ids.includes(this.id)) {
      router.push({ name: 'Result', params: { id: this.id } });
      return;
    }

    const q = await getQuestion(this.id);
    this.question = q;
    this.selected = q.selects[0].id;
  }
}
</script>
