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
    <v-checkbox
        v-model="hideNotUnlocked"
        label="Hide not unlocked items"
    ></v-checkbox>
    <div class="item-row" v-for="(itemRow, id) in completeItems" :key="id">
        <Item
            class="item"
            v-for="item in itemRow"
            :key="item.id"
            :item="item"/>
    </div>
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
      hideNotUnlocked: false,
    }),
    created: async function() {
      this.itemInfo = await getItemInfo();
      const savedApiKey = localStorage.getItem('apiKey');
      if (savedApiKey) {
        this.apiKey = savedApiKey;
        await this.getAccountInfo();
      }
    },
    computed: {
      completeItems: function() {
        return this.itemInfo.map(
            row => row.map(item => ({ ...item, avalCount: this.getAvalCount(item.id)})).filter(item => this.filterItem(item))
        );
      }
    },
    methods: {
      filterItem: function(item) {
        return item.avalCount > 0 || !this.hideNotUnlocked;
      },
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

<style scoped>
  .item-row {
    margin-bottom: 8px;
  }

  .item {
    margin-right: 48px;
  }
</style>
