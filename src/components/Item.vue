<template>
  <div>
    <v-badge
        color="green"
        :content="avalText"
    >
      <v-img :src="iconLink" :class="imgClassObject" max-width="64">

      </v-img>
    </v-badge>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    iconLink: String,
    countMax: Number,
    countAval: Number,
  },
  computed: {
    imgClassObject: function() {
      return {
        'not-available': this.countAval === 0,
      }
    },
    avalText: function() {
      return `${this.countAval} / ${this.countMax}`
    }
  }
}
</script>

<style scoped>
  .not-available {
    opacity: 30%;
  }

  .text {
    font-size: 16px;
    font-weight: bold;
  }
</style>