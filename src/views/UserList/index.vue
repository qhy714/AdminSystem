<template>
  <div class="shouye">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 搜索、添加用户 -->
      <el-input v-model="input" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">添加用户</el-button>

      <!-- 列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="state(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="small"
          ></el-button>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { UserAdmin, UserState } from '@/api/user'
export default {
  created () {
    this.UserAdmin()
  },
  data () {
    return {
      tableData: [], // 存放res中所有的user数据
      pagesize: 5, // 每页显示条数
      pagenum: 1, // 当前页码
      value: false,
      input: '',
      total: 0, // 总条数

      uId: 0,
      type: true
    }
  },
  methods: {
    async UserAdmin () {
      // 接收useradmin的所有值
      const res = await UserAdmin({ pagenum: this.pagenum, pagesize: this.pagesize })
      console.log(res)
      // 把res内的users值给到tabledata
      this.tableData = res.data.data.users
      console.log(this.tableData)
      // 获取总条数
      this.total = res.data.data.total
    },
    // 每页个数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val // 把每页条数给pagesize
      this.UserAdmin() // 重新渲染页面数据才能生效
    },
    // 当前页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val // 点击所触发的当前页码存入pagenum中
      this.UserAdmin() // 重新渲染
    },
    // 接收修改用户状态数据
    async state (data) {
      console.log(data)
      const res = await UserState({ uId: data.id, type: data.mg_state })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.shouye {
  background-color: #eaedf1;
  color: #606266;
  width: 100%;
  height: 100%;
  padding: 0 10px;
}
.content {
  width: 100%;
  height: 90%;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 4px;
  padding: 20px;
  .el-input {
    width: 300px;
    margin-right: 30px;
  }
  .el-table {
    margin-top: 20px;
  }
}
.block {
  margin-top: 20px;
}
</style>
