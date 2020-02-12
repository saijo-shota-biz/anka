<template>
  <Layout page-title="あんか">
    <v-card>

      <v-card-title>夏に遊ぶなら海 vs 山</v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-radio-group v-model="selected">
            <v-radio label="海" :value="1"></v-radio>
            <v-radio label="山" :value="2"></v-radio>
          </v-radio-group>
          <v-textarea label="コメント" v-model="comment" outlined counter="100" rows="6" :rules="[v => (!v || v.length <= 100) || 'コメントは100文字までです。']"></v-textarea>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-btn block color="primary" :disabled="!valid" :to="{ name: 'Result', params: { id: 1 } }">回答する</v-btn>
      </v-card-actions>

    </v-card>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

@Component({
  components: {
    Layout,
  },
})
export default class Question extends Vue {

  @Prop()
  private id!: string;

  private selected: number = 1;

  private comment: string = '';

  private valid: boolean = true;

}
</script>
