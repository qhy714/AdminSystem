<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <div class="content">
      <el-button type="primary">添加角色</el-button>

      <el-table border :data="rolelists">
        <el-table-column label="#" width="100px" type="expand">
          <template v-slot="scope">
            <RoleChildren :scope="scope.row.children"></RoleChildren>
          </template>
        </el-table-column>
        <el-table-column label="#" prop="id" width="100px"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="small" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" size="small" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="small"
              icon="el-icon-setting"
              @click="setrootfn(scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="分配权限" :visible.sync="permissionbtn" width="30%">
        <AssignPermissions @tree="treeDataFn"></AssignPermissions>
        <span slot="footer" class="dialog-footer">
          <el-button @click="permissionbtn = false">取 消</el-button>
          <el-button type="primary" @click="commitfn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { roleList, roleAuthorize } from '@/api/role'
import AssignPermissions from './components/AssignPermissions.vue'
import RoleChildren from './components/RoleChildren.vue'
export default {
  created () {
    this.roleList()
  },
  data () {
    return {
      rolelists: [],
      permissionbtn: false,
      treedata: '',
      roleid: ''
    }
  },
  methods: {
    async roleList () {
      const res = await roleList()
      console.log(res)
      this.rolelists = res.data.data
      console.log(this.rolelists)
    },
    treeDataFn (data) {
      console.log(data)
      this.treedata = data.join() // 把数组变成字符串
    },
    // 获取那一行中需要修改的角色的id
    setrootfn (id) {
      this.permissionbtn = true
      this.roleid = id
    },
    async commitfn () {
      this.permissionbtn = false
      if (this.treedata !== '') {
        const res = await roleAuthorize(this.roleid, this.treedata) // 把获取的选中的角色的id和选中的数据上传到服务器
        console.log(res)
        this.roleList() // 重新渲染页面，标签会更新变化
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { AssignPermissions, RoleChildren }
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
    .el-button {
      margin-bottom: 15px;
    }
  }
}
</style>
