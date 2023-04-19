<template>
  <div class="wrapper">
    <div class="lboard_section">
      <div class="lboard_tabs">
        <div class="tabs">
          <ul>
            <li class="active" data-li="leaderbord">Leaderbord</li>
            <li data-li="detailpagina">Detailpagina</li>
          </ul>
        </div>
      </div>
      <div class="lboard_wrap">
        <div class="lboard_item">
          <LeaderboardMember>
          </LeaderboardMember>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeaderboardMember from 'src/components/LeaderboardMember.vue';

export default defineComponent({
  components:{
    LeaderboardMember,
  },
});
</script>


<style lang="scss" scoped>
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  height: 100%;
}

.lboard_section {
  width: 500px;
  height: 400px;
  margin: 100px auto 0;
  background: #f94f62;
  border-radius: 5px;
  padding: 25px 40px;
  position: relative;
}

.lboard_section ul {
  display: flex;
}

.lboard_section ul li {
  margin-right: 50px;
  font-size: 18px;
  font-weight: 600;
  color: #3a3d51;
  cursor: pointer;
}

.lboard_section ul li:hover,
.lboard_section ul li.active {
  color: #fff;
}

.lboard_wrap {
  position: absolute;
  top: 70px;
  left: 40px;
  background: #ffd300;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.lboard_wrap .lboard_item {
  padding: 25px;
}
</style>
