<template>
  <div class="parent">
    <div @click="change(0)" class="children" id="item">听妈妈的话</div>
    <div @click="change(1)" class="children">青花瓷</div>
    <div @click="change(2)" class="children">七里香</div>
    <div @click="change(3)" class="children">稻香</div>
    <div @click="change(4)" class="children">我落泪情绪零碎</div>
    <span id="tips"></span>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    methods: {
      change(index) {
        var itemWidth = document.getElementById("item").offsetWidth;
        var tips = document.getElementById("tips");
        //自身div的一半 - 滑块的一半
        tips.style.left = itemWidth * index + itemWidth / 2 - tips.offsetWidth / 2 + 'px';
        console.log(tips.style.left);
      }
    },
    mounted() {
      this.change(0)
    }
  }
</script>
<style lang="scss">
  .parent {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    color:#000;
  }

  .children {
    width: 25%;
    text-align: center;
    cursor: pointer;
    height: 50px;
  }

  #tips {
    position: absolute;
    bottom: 0;
    height: 3px;
    width: 20px;
    background-color: red;
    -webkit-transition: left 500ms;
    -moz-transition: left 500ms;
    -ms-transition: left 500ms;
    -o-transition: left 500ms;
    transition: left 500ms;
  }
</style>
