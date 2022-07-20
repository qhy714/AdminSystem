<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容区域 -->
    <div class="content">
      <el-table :data="list">
        <el-table-column label="#" prop="id"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <PermissionTags :num="scope.row.level"></PermissionTags>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { permissionList } from '@/api/permission'
import PermissionTags from './components/PermissionTags.vue'
export default {
  async created () {
    const res = await permissionList()
    console.log(res)
    this.list = res.data.data
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    fn (data) {
      console.log(data)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { PermissionTags }
}
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  .content {
    width: 100%;
    // height: 90%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 4px;
    padding: 20px;
  }
}
</style>
