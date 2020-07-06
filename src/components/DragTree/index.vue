<template>
  <div
    class="drag_tree"
    :class="{'drag_tree__root': isRoot}"
    @mousemove="onMousemoveHandler"
    @mouseleave="onMouseleaveHandler"
  >
    <div
      ref="nodes"
      class="drag_tree__list">
      <div
        v-for="(node, index) in nodes"
        :key="index"
        class="drag_tree__node"
        :class="{'tree_selected': node && node.isSelected}"
      >
        <!--拖拽经过元素上方时显示-->
        <div
          class="drag_tree_cursor"
          :style="{visibility:
            cursorPosition &&
            cursorPosition.node.pathStr === node.pathStr &&
            cursorPosition.placement === 'before' ?
              'visible' :
              'hidden'
          }"
          @dragover.prevent
        />
        <!--数节点的item-->
        <div
          class="tree_item"
          :path="node.pathStr"
          :class="{'tree_item_cursor_hover': cursorPosition &&
                     cursorPosition.node.pathStr === node.pathStr,
                   'tree_item_cursor_inside': cursorPosition &&
                     cursorPosition.placement === 'inside' &&
                     cursorPosition.node.pathStr === node.pathStr
          }"
          @mousedown="onNodeMousedownHandler($event, node)"
          @mouseup="onNodeMouseupHandler($event, node)"
          @dragover="onExternalDragoverHandler(node, $event)"
          @drop="onExternalDropHandler(node, $event)"
          @contextmenu="emitNodeContextmenu(node, $event)"
          @click="onToggleHandler($event, node)"
        >
          <!--间距-->
          <div v-for="(id, inx) in gaps" :key="inx" class="drag_tree_gap"/>
          <div class="drag_tree_title">
            <!--toggle-->
            <span v-if="!node.isLeaf" class="drag_tree_toggle">
              <slot name="toggle" :node="node">
                <span> {{ !node.isLeaf ? (node.isExpanded ? '-' : '+') : '' }}</span>
              </slot>
            </span>
            <slot name="title" :node="node">{{node.guideCate}}</slot>
            <slot v-if="!node.isLeaf && node.nodes.length === 0 && node.isExpanded" name="empatyNode" :node="node"/>
          </div>

          <div class="drag_tree_sidebar">
            <slot name="sidebar" :node="node"/>
          </div>

        </div>
        <DragTree
          v-if="node.nodes && node.nodes.length && node.isExpanded"
          :value="node.nodes"
          :level="node.level"
          :parent-ind="index"
          :edge-size="edgeSize"
          :show-branches="showBranches"
          :allow-toggle-branch="allowToggleBranch"
          @dragover.prevent
        >
          <template #title="{node}">
            <slot name="title" :node="node">{{node.guideCate}}</slot>
          </template>

          <template #toggle="{node}">
            <slot name="toggle" :node="node">
              <span>{{ !node.isLeaf ? (node.isExpanded ? '-' : '+') : '' }}</span>
            </slot>
          </template>
          <template #sidebar="{node}">
            <slot name="sidebar" :node="node"/>
          </template>
          <template #emptyNode="{node}">
            <slot v-if="!node.isLeaf && node.nodes.length === 0 && node.isExpanded" :node="node" name="emptyNode"/>
          </template>
        </DragTree>
        <!--拖拽经过元素下方时显示-->
        <div
          class="drag_tree_cursor"
          :style="{visibility:
            cursorPosition &&
            cursorPosition.node.pathStr === node.pathStr &&
            cursorPosition.placement === 'after' ?
              'visible' :
              'hidden'
          }"
          @dragover.prevent
        >
          <!-- suggested place for node insertion  -->
        </div>
      </div>
      <!--拖拽时样式-->
      <div v-show="isDragging" v-if="isRoot" ref="dragInfo" class="drag_tree_drag_info">
        <slot name="draginfo">
          <template v-if="lastSelectedNode">
            <span class="tree_title">{{ lastSelectedNode.guideCate }}</span>
            <span class="tree_id"> #{{lastSelectedNode.id}}</span>
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ITreeNode, DragTree, ITraverse, placement, ICancelFn, ITraverseModels } from './type'
import { TreeNode } from 'element-ui/types/tree'
@Component({
  name: 'DragTree'
})

export default class extends Vue {
  @Prop({ default: 0 }) private level!: number
  @Prop({ default: [] }) private value!: ITreeNode[]
  @Prop() private parentInd!: number
  @Prop({ default: false }) private showBranches!:boolean
  @Prop({ default: 3 }) private edgeSize!: number
  @Prop({ default: true, type: Boolean }) private allowToggleBranch!: boolean
  private rootCursorPosition: { node: ITreeNode, placement: placement} | undefined = {
    node: { nodes: [], level: 0, pathStr: '', ind: 1, path: [] },
    placement: 'before'
  }
  private currentValue: ITreeNode[] = this.value
  private preventDrag: boolean = false
  private isDragging: boolean = false
  private mouseIsDown: boolean = false
  private lastSelectedNode: ITreeNode | {} = {}
  private scrollAreaHeight: number = 70
  private scrollSpeed: number = 0
  private scrollIntervalId: any = 0
  private maxScrollSpeed: number = 20
  private lastMousePos: { x: number, y: number} = {
    x: 0,
    y: 0
  }
  get isRoot() {
    return !this.level
  }
  get cursorPosition() {
    if (this.isRoot) return this.rootCursorPosition
    return this.getParent.cursorPosition
  }
  get nodes() {
    if (this.isRoot) {
      const nodeModels = this.deepCopy(this.currentValue)
      return this.getNodes(nodeModels)
    }
    // console.log('this.parentInd', this.parentInd)
    return this.getParent.nodes[this.parentInd].nodes
  }
  get getParent(): DragTree {
    return this.$parent as DragTree
  }
  /**
   * 生成间距
   */
  get gaps() {
    const gaps = []
    let i = this.level - 1
    if (!this.showBranches) i++
    while (i-- > 0) gaps.push(i)
    return gaps
  }
  @Watch('value')
  private onValueChange(value: ITreeNode[]) {
    this.currentValue = value
  }
  mounted() {
    if (this.isRoot) {
      document.addEventListener('mouseup', this.onDocumentMouseupHandler)
    }
  }
  beforeDestroy() {
    document.removeEventListener('mouseup', this.onDocumentMouseupHandler)
  }
  /**
   * tree 外层 鼠标移动
   */
  private onMousemoveHandler(event: MouseEvent) {
    if (!this.isRoot) {
      (this.getRoot() as DragTree).onMousemoveHandler(event)
      return
    }
    if (this.preventDrag) return
    const initiaDraggingState = this.isDragging
    const isDragging =
      this.isDragging || (
        this.mouseIsDown &&
        (this.lastMousePos.x !== event.clientX || this.lastMousePos.y !== event.clientY)
      )
    const isDragStarted = initiaDraggingState === false && isDragging === true
    this.lastMousePos = {
      x: event.clientX,
      y: event.clientY
    }
    if (!isDragging) return
    const $root = this.getRoot().$el
    const rootRect = $root.getBoundingClientRect()
    const $dragInfo = this.$refs.dragInfo as HTMLDivElement
    const dragInfoTop = event.clientY - rootRect.top + $root.scrollTop - (parseInt($dragInfo.style.marginBottom as string) | 0)
    const dragInfoLeft = (event.clientX - rootRect.left)
    $dragInfo.style.top = dragInfoTop + 'px'
    $dragInfo.style.left = dragInfoLeft + 'px'

    const cursorPosition = this.getCursorPositionFromCoords(event.clientX, event.clientY)
    const destNode = cursorPosition.node as ITreeNode
    const placement = cursorPosition.placement

    if (isDragStarted && !destNode.isSelected) {
      if (destNode.path) this.select(destNode.path, false, event)
    }
    const draggableNodes = this.getDraggable()
    if (!draggableNodes.length) {
      this.preventDrag = true
      return
    }
    this.isDragging = isDragging
    this.setCursorPosition({ node: destNode, placement })
    const scrollBottomLine = rootRect.bottom - this.scrollAreaHeight
    const scrollDownSpeed = (event.clientY - scrollBottomLine) / (rootRect.bottom - scrollBottomLine)
    const scrollTopLine = rootRect.top + this.scrollAreaHeight
    const scrollTopSpeed = (scrollTopLine - event.clientY) / (scrollTopLine - rootRect.top)
    if (scrollDownSpeed > 0) {
      this.startScroll(scrollDownSpeed)
    } else if (scrollTopSpeed > 0) {
      this.startScroll(-scrollTopSpeed)
    } else {
      this.stopScroll()
    }
  }
  /**
   * 鼠标离开
   */
  private onMouseleaveHandler(event: MouseEvent) {
    if (!this.isRoot || !this.isDragging) return
    const $root = this.getRoot().$el
    const rootRect = $root.getBoundingClientRect()
    if (event.clientY >= rootRect.bottom) {
      this.setCursorPosition({ node: this.nodes.splice(-1)[0], placement: 'after' })
    } else if (event.clientY < rootRect.top) {
      this.setCursorPosition({ node: this.getFirstNode(), placement: 'before' })
    }
  }
  /**
   * 内层 item 鼠标按下
   */
  private onNodeMousedownHandler(event: MouseEvent, node: ITreeNode) {
    if (event.button !== 0) return
    if (!this.isRoot) {
      (this.getRoot() as DragTree).onNodeMousedownHandler(event, node)
      return
    }
    // root
    this.mouseIsDown = true
  }
  /**
   * 鼠标抬起
   */
  private onNodeMouseupHandler(event: MouseEvent, targetNodet?: ITreeNode) {
    if (event.button !== 0) return
    if (!this.isRoot) {
      (this.getRoot() as DragTree).onNodeMouseupHandler(event, targetNodet as any)
      return
    }
    this.mouseIsDown = false
    if (!this.isDragging && targetNodet && !this.preventDrag) {
      this.select(targetNodet.path as number[], false, event)
    }
    this.preventDrag = false
    if (!this.cursorPosition) {
      this.stopDrag()
      return
    }
    const draggingNodes = this.getDraggable()
    for (let draggingNode of draggingNodes) {
      if (draggingNode.pathStr === this.cursorPosition.node.pathStr) {
        this.stopDrag()
        return
      }
      if (this.checkNodeIsParent(draggingNode, this.cursorPosition.node)) {
        this.stopDrag()
        return
      }
    }
    const newNodes = this.deepCopy(this.currentValue)
    const nodeModelsSubjectToInsert: ITreeNode[] = []
    for (let draggingNode of draggingNodes) {
      const sourceSiblings = this.getNodeSiblings(newNodes, draggingNode.path)
      const draggingNodeModel = sourceSiblings[draggingNode.ind]
      nodeModelsSubjectToInsert.push(draggingNodeModel)
    }
    let cancelled = false
    this.emitBeforeDrop(draggingNodes, this.cursorPosition, () => { cancelled = true })
    if (cancelled) {
      this.stopDrag()
      return
    }
    const nodeModelsToInsert: ITreeNode[] = []
    for (let draggingNodeModel of nodeModelsSubjectToInsert) {
      nodeModelsToInsert.push(this.deepCopy(draggingNodeModel))
      draggingNodeModel.markToDelete = true
    }
    this.insertModels(this.cursorPosition, nodeModelsToInsert, newNodes)
    this.traverseModels((nodeModel, siblings, ind) => {
      if (!nodeModel.markToDelete) return
      siblings.splice(ind, 1)
    }, newNodes);
    (this.lastSelectedNode as any) = null
    this.emitInput(newNodes)
    this.emitDrop(draggingNodes, this.cursorPosition, event)
    this.stopDrag()
  }
  private onExternalDragoverHandler(node: ITreeNode, event: MouseEvent) {
    event.preventDefault()
    const root = this.getRoot() as DragTree
    const cursorPosition = root.getCursorPositionFromCoords(event.clientX, event.clientY)
    root.setCursorPosition(cursorPosition)
    root.$emit('externaldragover', cursorPosition, event)
  }
  private onExternalDropHandler(node: ITreeNode, event: MouseEvent) {
    const root = this.getRoot() as DragTree
    const cursorPosition = root.getCursorPositionFromCoords(event.clientX, event.clientY)
    root.$emit('externaldrop', cursorPosition, event)
    this.setCursorPosition()
  }
  private traverseModels(cb: ITraverseModels, nodeModels: ITreeNode[]) {
    let i = nodeModels.length
    while (i--) {
      const nodeModel = nodeModels[i]
      if (nodeModel.nodes && nodeModel.nodes.length) this.traverseModels(cb, nodeModel.nodes)
      cb(nodeModel, nodeModels, i)
    }
    return nodeModels
  }
  private insertModels(cursorPosition: { node: ITreeNode, placement: placement }, nodeModels: ITreeNode[], newNodes: ITreeNode[]) {
    const destNode = cursorPosition.node
    const destSiblings = this.getNodeSiblings(newNodes, destNode.path)
    const destNodeModel = destSiblings[destNode.ind]
    if (cursorPosition.placement === 'inside') {
      destNodeModel.nodes = destNodeModel.nodes || []
      destNodeModel.nodes.unshift(...nodeModels)
    } else {
      const insertInd = cursorPosition.placement === 'before' ? destNode.ind : destNode.ind + 1
      destSiblings.splice(insertInd, 0, ...nodeModels)
    }
  }
  private deepCopy(value: any) {
    return JSON.parse(JSON.stringify(value))
  }
  private getNodes(nodeNodels: ITreeNode[], parentPath:number[] = [], isVisible = true) {
    return nodeNodels.map((nodeModel, inx) => {
      const nodePath = parentPath.concat(inx)
      return this.getNode(nodePath, nodeModel, nodeNodels, isVisible)
    })
  }
  private getNode(path: number[], nodeModel?: ITreeNode, siblings?: ITreeNode[], isVisible?: boolean): ITreeNode {
    const ind = path.slice(-1)[0]
    siblings = siblings || this.getNodeSiblings(this.currentValue, path)
    nodeModel = nodeModel || (siblings && siblings[ind]) || null
    if (!isVisible) {
      isVisible = this.isVisible(path)
    }
    const isExpanded = nodeModel.isExpanded === void 0 ? true : !!nodeModel.isExpanded
    const isDraggable = nodeModel.isDraggable === void 0 ? true : !!nodeModel.isDraggable
    const isSelectable = nodeModel.isSelectable === void 0 ? true : !!nodeModel.isSelectable
    let { nodes, ...item } = nodeModel
    const node:ITreeNode = {
      ...item,
      nodes: nodes.length ? this.getNodes(nodes, path, isExpanded) : [],
      isLeaf: !!nodeModel.isLeaf,
      isExpanded,
      isVisible,
      isDraggable,
      isSelectable,
      path: path,
      isSelected: !!nodeModel.isSelected,
      pathStr: JSON.stringify(path),
      ind,
      isFirstChild: ind === 0,
      isLastChild: ind === siblings.length - 1,
      level: path.length
    }
    return node
  }
  /**
   * 获取兄弟节点
   */
  private getNodeSiblings(nodes: ITreeNode[], path: number[]): ITreeNode[] {
    if (path.length === 1) return nodes
    return this.getNodeSiblings(nodes[path[0]].nodes, path.slice(1))
  }
  private isVisible(path: number[]) {
    if (path.length < 2) return true
    let nodeModels = this.currentValue
    for (let i = 0; i < path.length - 1; i++) {
      let ind = path[i]
      let nodeModel = nodeModels[ind]
      let isExpanded = nodeModel.isExpanded === void 0 ? true : !!nodeModel.isExpanded
      if (!isExpanded) return false
      nodeModels = nodeModel.nodes
    }
    return true
  }
  /**
   *  toggle
   */
  private onToggleHandler(event: Event, node: ITreeNode) {
    this.getRoot().$emit('nodeClick', node)
    if (!this.allowToggleBranch) return
    if (node.path) this.updateNode(node.path, { isExpanded: !node.isExpanded })
    event.stopPropagation()
  }
  /**
   * 更新 node 数据状态
   */
  private updateNode(path: number[], patch: {isExpanded: boolean}) {
    if (!this.isRoot) {
      this.getParent.updateNode(path, patch)
      return
    }
    const pathStr = JSON.stringify(path)
    const newNodes = this.deepCopy(this.currentValue) as ITreeNode[]
    this.traverse((node, nodeModel) => {
      if (node.pathStr !== pathStr) return
      Object.assign(nodeModel, patch)
    }, newNodes)
    this.emitInput(newNodes)
  }
  private traverse(fn:ITraverse, nodeModels?: ITreeNode[], parentPath: number[] = []): ITreeNode[] | boolean {
    if (!nodeModels) nodeModels = this.currentValue
    let shouldStop = false
    const nodes:ITreeNode[] = []
    for (let inx = 0; inx < nodeModels.length; inx++) {
      const nodeModel = nodeModels[inx]
      const itemPath = parentPath.concat(inx)
      const node = this.getNode(itemPath, nodeModel, nodeModels)
      shouldStop = fn(node, nodeModel, nodeModels) === false
      nodes.push(node)
      if (shouldStop) break
      if (nodeModel.nodes) {
        shouldStop = this.traverse(fn, nodeModel.nodes, itemPath) === false
        if (shouldStop) break
      }
    }
    return !shouldStop ? nodes : false
  }
  private getRoot() {
    if (this.isRoot) return this
    return this.getParent.getRoot()
  }
  /**
   * 更新值
   */
  private emitInput(newValue: ITreeNode[]) {
    this.currentValue = newValue
    this.getRoot().$emit('input', newValue)
  }
  private emitSelect(selectedNodes: ITreeNode[], event?: MouseEvent) {
    this.getRoot().$emit('select', selectedNodes, event)
  }
  private emitDrop(draggingNodes: ITreeNode[], position: { node: ITreeNode, placement: placement }, event: MouseEvent) {
    this.getRoot().$emit('drop', draggingNodes, position, event)
  }

  private getCursorPositionFromCoords(x: number, y: number) {
    const $target = document.elementFromPoint(x, y) as HTMLElement
    // 查找当前拖拽的node
    const $nodeItem = $target.getAttribute('path') ? $target : this.getClosetElementWithPath($target)
    let destNode
    let placement: placement
    if ($nodeItem) {
      destNode = this.getNode(JSON.parse($nodeItem.getAttribute('path') as string))
      const nodeHeight = $nodeItem.offsetHeight
      const edgeSize = this.edgeSize
      const offsetY = y - $nodeItem.getBoundingClientRect().top
      if (destNode.isLeaf) {
        placement = offsetY >= nodeHeight / 2 ? 'after' : 'before'
      } else {
        if (offsetY <= edgeSize) {
          placement = 'before'
        } else if (offsetY >= nodeHeight - edgeSize) {
          placement = 'after'
        } else {
          placement = 'inside'
        }
      }
    } else {
      const $root = this.getRoot().$el
      const rootRect = $root.getBoundingClientRect()
      if (y > rootRect.top + (rootRect.height / 2)) {
        placement = 'after'
        destNode = this.getLastNode()
      } else {
        placement = 'before'
        destNode = this.getFirstNode()
      }
    }
    return { node: destNode, placement }
  }
  private onDocumentMouseupHandler(event: MouseEvent) {
    if (this.isDragging) this.onNodeMouseupHandler(event)
  }
  private getClosetElementWithPath($el: HTMLElement | null): HTMLElement | null {
    if (!$el) return null
    if ($el.getAttribute('path')) return $el
    return this.getClosetElementWithPath($el.parentElement)
  }
  private getLastNode() {
    let lastNode
    this.traverse(node => {
      lastNode = node
    })
    return lastNode
  }
  private getFirstNode() {
    return this.getNode([0])
  }
  private select(path: number[], addToSelection = false, event?: MouseEvent) {
    const selectedNode = this.getNode(path)
    if (!selectedNode) return null
    const newNodes = this.deepCopy(this.currentValue)
    const selectedNodes: ITreeNode[] = []
    this.traverse((node, nodeModel) => {
      if (node.pathStr === selectedNode.pathStr) {
        nodeModel.isSelected = node.isSelectable
      } else if (!addToSelection) {
        if (nodeModel.isSelected) nodeModel.isSelected = false
      }
      if (nodeModel.isSelected) selectedNodes.push(node)
    }, newNodes)
    this.lastSelectedNode = selectedNode
    this.emitInput(newNodes)
    this.emitSelect(selectedNodes, event)
    return selectedNode
  }
  private getDraggable() {
    const selectedNodes: ITreeNode[] = []
    this.traverse(node => {
      if (node.isSelected && node.isDraggable) selectedNodes.push(node)
    })
    return selectedNodes
  }
  private setCursorPosition(pos?: { node: ITreeNode, placement: placement}) {
    if (this.isRoot) {
      this.rootCursorPosition = pos
      return
    }
    this.getParent.setCursorPosition(pos)
  }
  private checkNodeIsParent(sourceNode: ITreeNode, destNode: ITreeNode) {
    const destPath = destNode.path as number[]
    const sourcePath = sourceNode.path as number []
    return JSON.stringify(destPath.slice(0, sourcePath.length)) === sourceNode.pathStr
  }
  private startScroll(speed: number) {
    const $root = this.getRoot().$el
    if (this.scrollSpeed === speed) {
      return
    } else if (this.scrollIntervalId) {
      this.stopScroll()
    }
    this.scrollSpeed = speed
    this.scrollIntervalId = setInterval(() => {
      $root.scrollTop += this.maxScrollSpeed * speed
    }, 20)
  }
  private emitBeforeDrop(draggingNodes: ITreeNode[], position: { node: ITreeNode, placement: placement }, cancel: ICancelFn) {
    this.getRoot().$emit('beforedrop', draggingNodes, position, cancel)
  }
  private emitNodeContextmenu(node: ITreeNode, event: MouseEvent) {
    this.getRoot().$emit('nodecontextmenu', node, event)
  }
  private stopScroll() {
    clearInterval(this.scrollIntervalId)
    this.scrollIntervalId = 0
    this.scrollSpeed = 0
  }
  private stopDrag() {
    this.isDragging = false
    this.mouseIsDown = false
    this.setCursorPosition()
    this.stopScroll()
  }
}
</script>
<style lang="less" scoped>
.drag_tree {
    position: relative;
    cursor: default;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    &__root {
      border-radius: 3px;
    }
    &__list {
      overflow: hidden;
      position: relative;
      padding-bottom: 4px;
    }
    &__node {

    }
}

.tree_item {
    position: relative;
    display: flex;
    flex-direction: row;
    cursor: move;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 22px;
    border: 1px solid transparent;
}

.tree_item:hover, .tree_item.tree_item_cursor_hover {
  color: red;
}

.tree_item.tree_item_cursor_inside {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.drag_tree_gap {
    width: 25px;
    min-height: 1px;

}

.drag_tree_toggle {
    display: inline-block;
    text-align: left;
}

.drag_tree_sidebar {
    margin-left: auto;
}

.drag_tree_drag_info {
    position: absolute;
    background-color: rgba(0,0,0,0.5);
    opacity: 0.5;
    margin-left: 20px;
    padding: 5px 10px;
}
.tree_selected {
  > .tree_item {
    background-color: #ddd;
    color: white;
  }
}
.drag_tree_cursor {
  position: absolute;
  border: 1px solid #999;
  height: 3px;
  width: 100%;
}
.tree_title {
  color: #333;
}
.tree_id {
  color: #aaa;
}
</style>
