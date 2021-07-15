<template>
  <div>
    <v-container>
      <v-row>
        <v-col xl="10">
          <v-text-field
              v-model="apiKey"
              class="app__api-input"
              solo
              placeholder="Your API key"
          ></v-text-field>
        </v-col>
        <v-col xl="2">
          <v-btn @click="getAccountInfo">Go</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(itemRow, id) in itemInfo" :key="id">
        <v-col xl="1" v-for="item in itemRow" :key="item.id">
          <Item
              :iconLink="item.icon"
              :countMax="item.maxCount"
              :countAval="getAvalCount(item.id)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Item from "./Item";
  import {getItemInfo} from "../services/getItemInfo";
  import {getAccountInfo} from "../services/getAccountInfo";
  export default {
    name: 'MainPage',
    components: {Item},
    data: () => ({
      itemInfo: [],
      accountInfo: [],
      apiKey: '',
    }),
    created: async function() {
      this.itemInfo = await getItemInfo();
      const savedApiKey = localStorage.getItem('apiKey');
      if (savedApiKey) {
        this.apiKey = savedApiKey;
        await this.getAccountInfo();
      }
    },
    methods: {
      getAccountInfo: async function() {
        this.accountInfo = await getAccountInfo(this.apiKey);
        localStorage.setItem('apiKey', this.apiKey);
      },
      getAvalCount: function(id) {
        return this.accountInfo.find(item => item.id === id)?.count || 0;
      }
    }
  }
</script>
