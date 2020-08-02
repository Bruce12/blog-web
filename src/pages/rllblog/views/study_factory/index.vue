<template>
  <div>
    <DragTree
      v-if="list.length"
      v-model="list"
      allow-toggle-branch
      @nodeClick="nodeClick"
      @nodecontextmenu="showContextMenu"
    >
      <template #title="{ node }">
        <span class="item_icon">
          <i v-if="node.isLeaf" class="el-icon-paperclip"/>
        </span>
        <span class="tree_title">{{ node.guideCate }}</span>
        <span class="tree_id"> #{{node.id}}</span>
      </template>
      <template #toggle="{node}">
        <span class="toggle_icon">
          <i v-if="node.isExpanded" class="el-icon-arrow-right"/>
          <i v-else class="el-icon-arrow-down"/>
        </span>
      </template>
    </DragTree>
    <div v-show="contextMenuIsVisible" ref="contextmenu" class="contextmenu">
      <ul>
        <li @click.stop="addNode()">新增</li>
        <li @click.stop="delNode()">删除</li>
        <li>取消</li>
      </ul>
    </div>
    {{JSON.stringify(list, null, 4)}}
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DragTree from '@/components/DragTree/index.vue'
import { ITreeNode } from '@/components/DragTree/type'

@Component({
  name: 'StudyFactory',
  components: {
    DragTree
  }
})

export default class extends Vue {
  private list: any = [{
    'createdBy': 4390,
    'updatedBy': 4390,
    'createdTime': '2020-05-08 15:21:52',
    'updatedTime': '2020-05-08 15:21:52',
    'status': 1,
    'id': 244806,
    'guideCate': 'test 1',
    'busType': 'search',
    'guideScope': 'supply_sort',
    'parentId': 0,
    'path': '244806.',
    'sort': 906,
    'isDisplay': 1,
    'startTime': '2020-05-08 15:20:06',
    'endTime': '2020-05-09 00:00:00',
    'nodes': [{
      'createdBy': 4390,
      'updatedBy': 4390,
      'createdTime': '2020-05-08 15:22:26',
      'updatedTime': '2020-05-08 15:23:14',
      'status': 1,
      'id': 244807,
      'guideCate': '头部',
      'busType': 'search',
      'parentId': 244806,
      'path': '244806.244807.',
      'sort': 1,
      'action': 'query',
      'actionTarget': 'www.',
      'style': 'block',
      'displayDesc': {
        'moreLink': '',
        'dictStyle': 'sort_banner32',
        'moreQuery': '',
        'more': '',
        'count': 3,
        'width': 246,
        'title': '',
        'height': 132
      },
      'isDisplay': 0,
      'startTime': '2020-05-08 17:00:00',
      'endTime': '2020-05-09 17:00:00',
      'nodes': [{
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:23:50',
        'updatedTime': '2020-05-08 15:23:50',
        'status': 1,
        'id': 244810,
        'guideCate': '子节点1',
        'busType': 'search',
        'parentId': 244807,
        'path': '244806.244807.244810.',
        'sort': 1,
        'displayDesc': {
          'img': ''
        },
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }, {
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:23:58',
        'updatedTime': '2020-05-08 15:23:58',
        'status': 1,
        'id': 244811,
        'guideCate': '子节点2',
        'busType': 'search',
        'parentId': 244807,
        'path': '244806.244807.244811.',
        'sort': 2,
        'displayDesc': {
          'img': ''
        },
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }, {
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:24:04',
        'updatedTime': '2020-05-08 15:24:04',
        'status': 1,
        'id': 244812,
        'guideCate': '33333',
        'busType': 'search',
        'parentId': 244807,
        'path': '244806.244807.244812.',
        'sort': 3,
        'displayDesc': {
          'img': ''
        },
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }],
      'preImg': 'http://img.yimutian.com/crm/5b349f3be938e87059e7af6fbadcacb7.jpeg',
      'dynamic': 0
    }, {
      'createdBy': 4390,
      'updatedBy': 4390,
      'createdTime': '2020-05-08 15:22:48',
      'updatedTime': '2020-05-08 15:23:30',
      'status': 1,
      'id': 244808,
      'guideCate': 'banner',
      'busType': 'search',
      'parentId': 244806,
      'path': '244806.244808.',
      'sort': 2,
      'action': 'link',
      'isDisplay': 1,
      'nodes': [{
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:24:12',
        'updatedTime': '2020-05-08 15:24:12',
        'status': 1,
        'id': 244813,
        'guideCate': 'b-1',
        'busType': 'search',
        'parentId': 244808,
        'path': '244806.244808.244813.',
        'sort': 1,
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }, {
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:24:22',
        'updatedTime': '2020-05-08 15:24:23',
        'status': 1,
        'id': 244814,
        'guideCate': 'b-2',
        'busType': 'search',
        'parentId': 244808,
        'path': '244806.244808.244814.',
        'sort': 2,
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }],
      'dynamic': 0
    }, {
      'createdBy': 4390,
      'updatedBy': 4390,
      'createdTime': '2020-05-08 15:22:59',
      'updatedTime': '2020-05-08 15:23:40',
      'status': 1,
      'id': 244809,
      'guideCate': '导航',
      'busType': 'search',
      'parentId': 244806,
      'path': '244806.244809.',
      'sort': 3,
      'action': 'link',
      'isDisplay': 1,
      'nodes': [{
        'createdBy': 4390,
        'updatedBy': 4390,
        'createdTime': '2020-05-08 15:24:39',
        'updatedTime': '2020-05-08 15:24:39',
        'status': 1,
        'id': 244815,
        'guideCate': '导航-1',
        'busType': 'search',
        'parentId': 244809,
        'path': '244806.244809.244815.',
        'sort': 1,
        'isDisplay': 1,
        'nodes': [],
        'dynamic': 0
      }],
      'dynamic': 0
    }],
    'dynamic': 0
  }]
  private curentSelectId: number = 0
  private contextMenuIsVisible: boolean = false
  private showPreviewCode: boolean = false
  private curentNode!: ITreeNode | null
  /*
   *  当前 树某个节点被点击
   */
  private nodeClick(node: ITreeNode) {
    this.curentSelectId = node.id as number
    this.contextMenuIsVisible = false
  }
  /**
   * 右击显示的菜单
   */
  private showContextMenu(node: ITreeNode, event: MouseEvent) {
    event.preventDefault()
    this.contextMenuIsVisible = true
    this.curentNode = node
    this.$nextTick(() => {
      const $contextMenu = this.$refs.contextmenu as HTMLElement
      $contextMenu.style.left = event.pageX + 'px'
      $contextMenu.style.top = event.pageY + 'px'
    })
  }
}
</script>
<style lang="less" scoped>
.item_icon {
  display: inline-block;
  text-align: left;
}
.el-icon-paperclip {
  color: #3c8dbc;
}
.tree_title {
  color: #333;
}
.tree_id {
  color: #aaa;
}
.toggle_icon {
  font-size: 12px;
  color: #3c8dbc;
}
.contextmenu {
  position: absolute;
  background-color:#ddd;
  color: black;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  top: 0;
  left: 0;
  ul {
    list-style: none;
    padding: 0px;
    margin:0px;
    li {
      padding: 4px;
      &:hover {
        background:  #02c83e;
        color: #fff;
      }
    }
  }
}
</style>
