<script>
  export default {
    functional: true,
    name: 'ParticleComponent',
    props: ['particle'],
    render(createElement, context) {
      return createElement('g', null, [
        createElement('rect', {
          attrs: {
            x: context.props.particle.displayX,
            y: context.props.particle.displayY,
            width: 2,
            height: 2,
          },
        }),
      ]);
    },
  };
</script>
