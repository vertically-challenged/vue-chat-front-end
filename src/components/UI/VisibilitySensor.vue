<template>
  <div ref="observer" class="sensor"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'visibility-sensor',
  props: {
    scrollArea: {
      type: String,
    },
  },
  mounted() {
    const options = {
      root: (this.$refs[`${this.scrollArea}`] as Element),
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = (entries:IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        // visible
        this.$emit('observe', true)
      }
      if (!entries[0].isIntersecting) {
        // invisible
        this.$emit('observe', false)
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe((this.$refs.observer as Element))
  },
})
</script>

<style lang="css" scoped>
.sensor {
  height: 40px;
  width: 100%;
  margin-top: -60px;
  z-index: -1;
}
</style>
