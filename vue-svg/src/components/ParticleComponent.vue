<template>
  <g>
    <rect
      v-bind:x="particle.displayX"
      v-bind:y="particle.displayY"
      width="2"
      height="2">
    </rect>
  </g>
</template>

<script>
  export default {
    name: 'ParticleComponent',
    props: ['particle'],
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
