<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="teal"
                dark
                flat
              >
                <v-toolbar-title>ログイン</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-btn block :to="{ name: 'Home' }">
                  <v-icon left color="primary" dark>mdi-twitter</v-icon>
                  ついったー
                </v-btn>

                <div align="center" style="padding-top:10px; padding-bottom:10px;">or</div>

                <v-btn block>ななしのごんべ</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

}
</script>
