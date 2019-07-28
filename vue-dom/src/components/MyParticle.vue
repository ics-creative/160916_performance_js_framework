<template>
  <div class="particle"
       v-if="particle"
       v-bind:style="{top: particle.y + 'px', left: particle.x + 'px'}">
    😊
  </div>
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
  .particle {
    position: absolute;
  }
</style>
