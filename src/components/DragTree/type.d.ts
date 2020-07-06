import Vue from 'vue'

export interface ITreeNode {
  path: number[]
  pathStr: string
  ind: number
  level: number
  isSelected?: boolean
  isSelectable?: boolean
  nodes: ITreeNode[]
  markToDelete?: boolean
  isDraggable?: boolean
  isExpanded?: boolean
  isLeaf?:boolean
  isVisible?: boolean
  isFirstChild?:boolean
  isLastChild?: boolean
  id?: number
}
export interface ITraverse {
  (node: ITreeNode, nodeModel: ITreeNode, nodeModels?: ITreeNode[]): void | boolean
}

export interface ITraverseModels {
  (node: ITreeNode, nodeModels: ITreeNode[], ind: number): void
}

export type placement = 'after' | 'before' | 'inside'

export interface ICancelFn {
  (): void
}

export type QRCode = {
  app_id: number
  page: string
  scene: string
}

export interface IDesplayDesc {
  dictStyle: string
}

export interface IDictStyles {
  node?: {
    structuredDesc: {
      img?: string,
      remark?: string,
      fields?: any[],
      childFields: any[]
    },
    dictCode: string
    dictValue: string
    level: number
  }
  dictCode: string
  dictValue: string
  level: number
}

export interface IDetailData {
  createdBy: number
  updatedBy: number
  createdTime: string
  updatedTime: string
  status: number
  id: number
  guideCate: string
  busType: string
  parentId: number
  path: string
  sort: number
  action?: string
  actionTarget: string
  displayDesc: IDesplayDesc
  isDisplay: number
  dynamic: number
  startTime?: string
  endTime?: string
}

export type CatchNode = {
  displayDesc: any
  id: number
}

export interface IFormModel {
  guideCate: string,
  action: string,
  actionTarget: string,
  startTime: string,
  endTime: string,
  isDisplay: number,
  postStyle: string
}

export class DragTree extends Vue {
  level: number
  readonly nodes: ITreeNode[]
  getNodeIds(path: number[]): ITreeNode[]
  readonly getParent: DragTree
  updateNode(path: number[], item: {isExpanded: boolean}): void
  getRoot(): DragTree
  onMousemoveHandler(event: Event): void
  setCursorPosition(pos?: { node: ITreeNode, placement: placement}): void
  onNodeMousedownHandler(event: MouseEvent, node: ITreeNode): void
  cursorPosition: { node: ITreeNode, placement: placement}
  getCursorPositionFromCoords(x: number, y: number): { node: ITreeNode, placement: placement }
  onNodeMouseupHandler(event: MouseEvent, targetNode: ITreeNode): void
}
