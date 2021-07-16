<template>
  <span>
    <v-badge
        :color="color"
        :content="avalText"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-img :src="item.icon" @click="openWiki" :class="imgClassObject" max-width="64" v-bind="attrs" v-on="on"/>
        </template>
        <div>{{ item.name }}</div>
        <div>{{ item.details.weight_class || '' }} {{ item.details.type || '' }}</div>
      </v-tooltip>
    </v-badge>
  </span>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
  },
  computed: {
    imgClassObject: function() {
      return {
        'not-available': this.item.avalCount === 0,
      }
    },
    color: function() {
      return this.item.avalCount > 0 ? 'green' : 'red';
    },
    avalText: function() {
      return `${this.item.avalCount} / ${this.item.maxCount}`
    }
  },
  methods: {
    openWiki: function() {
      const wikiLink = `https://wiki.guildwars2.com/index.php?title=Special:Search&search=${this.item.name}`
      window.open(wikiLink);
    },
  }
}
</script>

<style scoped>
  .not-available {
    opacity: 0.3;
  }

  .text {
    font-size: 16px;
    font-weight: bold;
  }
</style>