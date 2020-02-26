<template>
  <v-app app>
    <v-app-bar color="teal" app dark>
      <v-toolbar-title>あんけーと</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-card>
          <v-card-title>{{ pageTitle }}</v-card-title>
          <v-card-text>
            <slot name="content"></slot>
          </v-card-text>
          <v-card-actions>
            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-content>

    <v-snackbar
      v-model="error.show"
      :timeout="3000"
      color="red"
    >
      {{ error.text }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface Snackbar {
  show: boolean;
  text: string;
}

@Component
export default class Layout extends Vue {

  @Prop()
  private pageTitle!: string;

  private error: Snackbar = {
    show: false,
    text: '',
  };

  public onError(error: string) {
    this.error.text = error;
    this.error.show = true;
  }

}
</script>
