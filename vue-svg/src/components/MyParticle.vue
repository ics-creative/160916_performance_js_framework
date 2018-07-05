<template>
  <circle
    v-bind:cx="particle.x"
    v-bind:cy="particle.y"
    r="3">
  </circle>
</template>

<script>
  import ParticleData from "../ParticleData";

  export default {
    name: "MyParticle",
    props: {
      particle: ParticleData
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
