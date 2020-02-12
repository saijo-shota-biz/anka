<template>
  <Layout page-title="あんか一覧">
    
    <v-list>

      <v-divider></v-divider>

      <v-list-item :to="{ name: 'Question', params: { id: '1' } }">
        <v-list-item-icon>
          <v-icon color="pink">mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>夏に遊ぶなら海 vs 山？</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="gray">mdi-arrow-right-bold-outline</v-icon>
          </v-btn>
        </v-list-item-action>

      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="pink">mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>夏に遊ぶなら海 vs 山？</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="gray">mdi-arrow-right-bold-outline</v-icon>
          </v-btn>
        </v-list-item-action>

      </v-list-item>

      <v-divider></v-divider>
    </v-list>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

@Component({
  components: {
    Layout,
  },
})
export default class Home extends Vue {
}
</script>
