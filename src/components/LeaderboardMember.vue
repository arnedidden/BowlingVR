<template>
  <div class="lboard_mem">
    <div class="name_bar">
      <p><span>number here</span>name here</p>
      <div class="bar_wrap">
        <div class="inner_bar" style="width: 100%"></div>
      </div>
    </div>
    <div class="points">points here</div>
  </div>
</template>

<style lang="scss">
.name_bar {
  margin: 0 20px;
  width: calc(100% - 150px);
}

.name_bar p {
  color: #3a3d51;
}

.name_bar p span {
  margin-left: 5px;
}

.bar_wrap {
  height: 5px;
  width: 100%;
  background: #d5b000;
  border-radius: 5px;
  margin-top: 5px;
  position: relative;
  overflow: hidden;
}

.bar_wrap .inner_bar {
  position: absolute;
  top: 0%;
  left: 0;
  height: 5px;
  background: #fff;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.points {
  width: 100px;
  color: #3a3d51;
}

.lboard_mem {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid #ffe773;
}

.lboard_mem:first-child {
  padding-top: 0;
}
</style>
