<template>
  <div class="page-container">
    <canvas
      id="gameScense"
      width="600"
      height="600"
    />
    <div id="gameSet">
      <div
        id="gameControl"
        class="gameBoxStyle"
      >
        <h3>游戏控制</h3>
        <p>方向键：上,下,左,右</p>
        <p>开始/暂停：空格</p>
      </div>
      <div
        id="gameStatus"
        class="gameBoxStyle"
      >
        <h3>游戏状态</h3>
        <p>
          用户名：<input
            id="txtUserName"
            type="text"
            placeholder="输入用户名:"
            value="游客123"
          >
        </p>
        <p>当前用户1得分：<span id="txtValue">0</span></p>
        <input
          id="btnStart"
          type="button"
          value="开始游戏"
          @click="gameStart($event)"
        >
        <input
          id="btnPause"
          type="button"
          value="暂停"
          @click="pause()"
        >
      </div>
      <div
        id="game"
        class="gameBoxStyle"
      >
        <h3>游戏记录</h3>
        <a href="#">查看历史记录</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Game from './snake'

@Component({
  name: 'Index',
  components: {
  }
})

export default class extends Vue {
  private game!: Game
  mounted() {
    type a = 12
    let b:a
  }
  gameStart() {
    if (!this.game) this.game = new Game('#gameScense')
    // 开始游戏
    this.game.start()

    this.game.onScoreChange = (score: number) => {
    }
  }
  pause() {
    // 暂停游戏
  }
}
</script>
<style lang="less">
  .page-container {
    text-align: center;
  }
   * {
    margin: 0px;
    padding: 0px;
  }
  input[type="button"],input[type="text"] {
    outline: none;
  }
  #gamebd {
    width: 850px;
    margin: 50px auto;

  }
  #gameScense {
    background-color: red;
    display: inline-block;
  }

  #gameSet {
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
  }

  .gameBoxStyle {
    margin-bottom: 7px;
    padding: 5px 10px;
  }

  .gameBoxStyle h3 {
    margin-bottom: 7px;
  }

  .gameBoxStyle p {
    line-height: 1.7em;
  }

  .gameBoxStyle input {
    margin-top: 7px;
    background-color: white;
    border: 1px gray solid;
    padding: 3px 9px;
    margin-right: 9px;
  }

  .gameBoxStyle input[type=text] {
    width: 90px;
  }

  .gameBoxStyle input:hover {
    background-color: #e2fff2;
  }

  .gameBoxStyle #txtValue {
    color: red;
  }
</style>
