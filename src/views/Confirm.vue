<template>
  <Layout page-title="質問を作成しました">
    <div slot="content">
      <p>下記のURLをコピーして共有しよう！</p>
      <div class="title" id="url">{{ url }}</div>
    </div>
    <v-btn slot="actions" block @click="copy">URLをコピーする</v-btn>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import { MY_QUESTIONS_KEY } from '@/helpers.ts';

@Component({
  components: {
    Layout,
  },
})
export default class Confirm extends Vue {
  @Prop()
  private id!: string;

  private get url(): string {
    return location.origin + this.$router.resolve({ name: 'Question', params: { id: this.id } }).href;
  }

  private copy() {
    const target = document.querySelector('#url');
    document.getSelection().selectAllChildren(target!);
    document.execCommand('copy');
  }

  private created() {
    const myQuestionsJson: string = localStorage.getItem(MY_QUESTIONS_KEY) || '[]';
    const myQuestions: string[] = JSON.parse(myQuestionsJson);
    myQuestions.push(this.id);
    localStorage.setItem(MY_QUESTIONS_KEY, JSON.stringify(myQuestions));
  }

}
</script>
