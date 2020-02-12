<template>
  <v-app app>
    <v-app-bar color="teal" app dark>
      <v-toolbar-title>あんかっ！</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-subheader>{{ pageTitle }}</v-subheader>
        <slot></slot>
        <v-btn fixed dark fab bottom right color="pink">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-content>
  </v-app>  
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {

  @Prop()
  private pageTitle!: string;

}
</script>
