<template>
  <button @click="handleClick"><slot /></button>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {
      isClick: false,
    };
  },
  methods: {
    handleClick(event) {
      if (this.isClick) return;
      this.isClick = true;
      const promise = this.$listeners.click(event);
      if (promise instanceof Promise) {
        promise.finally(() => {
          this.isClick = false;
        });
      } else {
        this.isClick = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
