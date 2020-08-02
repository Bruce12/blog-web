
/**
 * 贪吃蛇 ts 版
 * 类的继承，接口，
 */
interface ISnake {
  speed: number
  changeSpeed(): void
}
/**
 * 配置
 */
interface ISnakeConfig {
  color?: string
  speed?: number
  y?: number
}

/**
 * 抽象动物类
 */
abstract class Animal {
  public abstract move(direction: number):void
  public abstract eat(snakeHead: Point): boolean
  public size!: number
  public color!: string
  speed!: number
}
/**
 * 方向Code
 */
enum direction {
  Up = 38,
  Down = 40,
  Left = 37,
  Right = 39
}
/**
 * 食物类
 * 负责生产食物
 */
class Food {
  private colCount!: number
  private rowCount!: number
  private generated!: boolean
  // 静态属性：保存当前正在活动的食物
  public static curFood: Point
  private color!: string
  private size!: number
  constructor(opt: {colCount: number, rowCount: number, color: string, size: number, points: Array<Point>}) {
    this.colCount = opt.colCount
    this.rowCount = opt.rowCount
    this.color = opt.color
    this.size = opt.size
    // 初始化食物
    this.genFood(opt.points)
  }
  genFood(points: Array<Point>) {
    let foodCol: number = 0
    let foodRow: number = 0
    do {
      foodCol = Math.floor(Math.random() * this.colCount)
      foodRow = Math.floor(Math.random() * this.rowCount)
      this.generated = false
      // 在蛇身体所有的 坐标点上 比较
      points.forEach((item: Point) => {
        if (item.row === foodRow && item.col === foodCol) {
          this.generated = true
        }
      })
    } while (this.generated)
    // 绘制食物在图形上
    Food.curFood = new Point(foodRow, foodCol)
    Food.curFood.draw(this.color, this.size)
  }
}
/**
 *  场景面板类 Canvas
 */
class Scene {
  sceneMap!: HTMLCanvasElement
  height!: number
  width!: number
  bgColor!: string
  static graphic: CanvasRenderingContext2D
  constructor(id: string, opt: { width: number, height: number, bgColor: string }) {
    this.sceneMap = document.querySelector(id) as HTMLCanvasElement
    this.height = opt.height
    this.width = opt.width
    this.bgColor = opt.bgColor
    this.init()
  }
  // 设置画布
  private init() {
    this.sceneMap.height = this.height
    this.sceneMap.width = this.width
    this.sceneMap.style.background = this.bgColor
    Scene.graphic = this.sceneMap.getContext('2d') as CanvasRenderingContext2D
  }
}
/**
 * 提供画布上画点的方法
 */
class Point {
  public row!: number
  public col!: number
  color: string = ''
  constructor(row: number, col: number) {
    this.row = row
    this.col = col
  }
  public equal(snakeBlock: any): boolean {
    if (snakeBlock && snakeBlock.row === this.row && snakeBlock.col === this.col) {
      return true
    } else {
      return false
    }
  }
  public draw(color: string, size: number) {
    Scene.graphic.fillStyle = color
    Scene.graphic.fillRect(size * this.col, size * this.row, size - 2, size - 2)
  }
  public clearDraw(color: string, size: number) {
    Scene.graphic.fillStyle = color
    Scene.graphic.fillRect(size * this.col, size * this.row, size, size)
  }
}

/**
 * 蛇：游戏玩家
 */
class Snake extends Animal implements ISnake {
  color!: string
  speed!: number
  // 蛇大小
  size: number = 20
  public static isMoved: boolean = false
  gameStatus: boolean = false

  // 蛇身
  public points: Array<Point> = []
  private snakeColor!: string
  private levelCount: number = 10
  // 蛇身起始位置 Y 轴， x轴默认1
  private startY!:number

  constructor(config: ISnakeConfig) {
    super()
    this.snakeColor = config.color || 'red'
    this.speed = config.speed || 200
    this.startY = config.y || 15
    this.setPoints()
  }
  /*
   初始化蛇身
  */
  setPoints() {
    this.points = []
    for (let i = 0; i < 5; i++) {
      let point = new Point(this.startY, i + 1)
      point.draw(this.snakeColor, this.size)
      this.points.push(point)
    }
  }
  /**
   * 运动
   */
  move(curDirection: number): Point {
    let snakeBlock2 = this.points[this.points.length - 1]// 头部
    let newBlock: Point = new Point(1, 0)
    switch (curDirection) {
      case 1:
        newBlock = new Point(snakeBlock2.row, snakeBlock2.col + 1)
        break
      case 2:
        newBlock = new Point(snakeBlock2.row + 1, snakeBlock2.col)
        break
      case 3:
        newBlock = new Point(snakeBlock2.row, snakeBlock2.col - 1)
        break
      case 4:
        newBlock = new Point(snakeBlock2.row - 1, snakeBlock2.col)
        break
    }
    this.points.push(newBlock)
    newBlock.draw(this.snakeColor, this.size)
    return newBlock
  }
  // 吃食物
  eat(snakeHead: Point): boolean {
    if (snakeHead instanceof Point) {
      if (snakeHead.equal(Food.curFood)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  /**
   * 改变速度
   */
  changeSpeed() {
    // if (!(this.count % this.levelCount)) {
    //   if (this.curSpeed > 150) {
    //     this.curSpeed -= 50
    //   } else if (this.curSpeed <= 150 && this.curSpeed >= 100) {
    //     this.curSpeed -= 15
    //   } else {
    //     this.curSpeed -= 5
    //   }
    // }
  }
}
interface IGameConfig {
  // 行数
  rowCount?: number
  // 列数
  colCount?: number
  // 蛇颜色
  snakeColor?: string
  // 大小
  size?: number
  // 食物颜色
  foodColor?: string
  // 场景颜色
  sceneBgColor?: string
}
// 游戏启动类
class Game {
  // 初始化
  // 游戏配置项
  // 容器的id
  id!: string
  // 游戏状态
  public gameStatus: boolean = false
  // 得分
  public score: number = 0
  // 蛇
  private snake!: Snake
  // 食物
  private food!: Food
  // 场景 画布
  private scene!: Scene
  public onScoreChange!: Function
  private rowCount!: number
  private colCount!: number
  private size!: number
  private foodColor!: string
  private snakeColor!: string
  private sceneBgColor!: string
  private y: number = 15

  private curDirection: number = 1
  private pauseKey = 32
  private isMoved: boolean = false
  private gameTimer: any = null
  // 初始化
  constructor(id: string, config?: IGameConfig) {
    this.id = id
    if (!config) config = {}
    this.rowCount = config.rowCount || 30
    this.colCount = config.colCount || 30
    this.size = config.size || 20
    this.foodColor = config.foodColor || 'red'
    this.snakeColor = config.snakeColor || 'yellow'
    this.sceneBgColor = config.sceneBgColor || 'green'
    let sceneConfig = {
      width: this.colCount * this.size,
      height: this.rowCount * this.size,
      bgColor: this.sceneBgColor
    }
    // 1.建立场景
    this.scene = new Scene(id, sceneConfig)
    let snakeConfig = {
      y: this.y,
      speed: 200,
      color: this.snakeColor
    }
    /**
     * 初始化
     */
    if (this.scene.width !== this.size * this.rowCount || this.scene.height !== this.size * this.colCount) {
      return
    }
    // 2. 初始化蛇
    this.snake = new Snake(snakeConfig)
    let foodConfig = {
      colCount: this.colCount,
      rowCount: this.rowCount,
      size: this.size,
      color: this.foodColor,
      points: this.snake.points
    }
    // 3. 初始化食物
    this.food = new Food(foodConfig)
    this.initKeyEvent()
  }
  initKeyEvent() {
    // 监听移动方向
    document.onkeydown = (e: KeyboardEvent) => {
      let key = (e || event).keyCode
      this.handleDirection(key)
    }
  }
  /**
   * 处理键盘 [39, 40, 37, 38]
   */
  handleDirection(key: number) {
    var inputDirection = this.curDirection
    switch (key) {
      case direction.Right:
        inputDirection = 1
        break
      case direction.Down:
        inputDirection = 2
        break
      case direction.Left:
        inputDirection = 3
        break
      case direction.Up:
        inputDirection = 4
        break
      case this.pauseKey:
        // this.changeGameStatus()
        break
    }
    if (this.isMoved || (typeof this.gameTimer !== 'number')) { // 只有上一次方向移动或者暂停，才能更改方向
      if (inputDirection + 2 === this.curDirection || inputDirection - 2 === this.curDirection || inputDirection === this.curDirection) {
        // 不需要变动方向
      } else {
        this.curDirection = inputDirection
      }
      this.isMoved = false
    }
  }
  // 游戏是否结束
  gameOver() {
    var isGameOver = false
    // 头部
    var snakeHead = this.snake.points[this.snake.points.length - 1]
    // console.log('snakeHead', snakeHead)
    if (snakeHead.row < 0 || snakeHead.row >= this.rowCount || snakeHead.col < 0 || snakeHead.col >= this.colCount) {
      isGameOver = true
    }
    for (var i = 0; i < this.snake.points.length - 3; i++) { // 头部需要和尾部的snake.lenth-4个进行判断即可
      if (snakeHead.equal(this.snake.points[i])) {
        isGameOver = true
      }
    }
    return isGameOver
  }
  changeGameStatus() {
    // if (this.gameStatus) {
    //   if (typeof this.runId === 'number') {
    //     clearTimeout(this.runId)
    //     this.runId = ''
    //   } else {
    //     this.runGame()
    //   }
    // }
  }
  // 启动游戏
  start() {
    this.gameStatus = true
    clearTimeout(this.gameTimer)
    // 蛇移动
    this.snakeMove()
  }
  private snakeMove() {
    if (this.gameStatus) {
      let newBlock = this.snake.move(this.curDirection)
      // 游戏是否结束
      if (this.gameOver()) {
        this.gameStatus = false
      } else {
        if (this.snake.eat(newBlock)) { // 是否吃到了食物
          // 产生食物
          this.food.genFood(this.snake.points)
          this.score++
          // this.changeSpeed()
          // this.triggerEvent(this.onCountChange, this.count)
        } else {
          (this.snake.points.shift() as Point).clearDraw(this.scene.bgColor, this.size)
        }
        this.isMoved = true// 可以更改方向了
      }
      this.gameTimer = setTimeout(() => {
        this.snakeMove()
      }, this.snake.speed)
    } else {
      //
    }
  }
  // 暂停游戏
  pause() {

  }
  // 分数改变时
}
export default Game
