<template>
  <Layout page-title="質問を作る" ref="layout">
    <div slot="content">
      <v-textarea auto-grow rows="5" label="質問内容" outlined v-model="context"></v-textarea>
      <v-text-field v-for="(select, index) in selects" :key="select.id" outlined :label="'選択肢' + (index + 1)"
        append-outer-icon="mdi-close"
        @click:append-outer="close(index)"
        v-model="select.value"
        :background-color="select.color"
      ></v-text-field>
      <v-btn outlined block @click="add()" :disabled="selects.length >= 5">選択肢を増やす</v-btn>
    </div>
    <v-btn slot="actions" color="primary" block @click="create">質問を作る</v-btn>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import { Select, Question } from '@/types.ts';
import { genId, getSelectionColor } from '@/helpers.ts';
import { addQuestion } from '@/firebase.ts';
import router from '@/router';

@Component({
  components: {
    Layout,
  },
})
export default class Home extends Vue {
  private context: string = '';
  private selects: Select[] = [
    {
      id: genId(),
      value: '',
      color: getSelectionColor(0),
    },
    {
      id: genId(),
      value: '',
      color: getSelectionColor(1),
    },
  ];

  private add() {
    this.selects.push({
      id: genId(),
      value: '',
      color: getSelectionColor(this.selects.length),
    });
  }

  private close(index: number) {
    this.selects.splice(index, 1);
    this.selects.forEach((select, idx) => select.color = getSelectionColor(idx));
  }

  private create() {
    if (this.selects.length < 2) {
      (this.$refs.layout as Layout).onError('選択肢は2つ以上にしてください。');
      return;
    }

    addQuestion({
      content: this.context,
      selects: this.selects,
      answer: [],
    })
    .then((id) => {
      router.push({ name: 'Confirm', params: { id } });
    })
    .catch((error) => (this.$refs.layout as Layout).onError(error));

  }
}
</script>
