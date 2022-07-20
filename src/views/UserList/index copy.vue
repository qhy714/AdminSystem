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
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="UserAdmin"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="adduser">添加用户</el-button>

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
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deletefn(scope.row.id)"
            ></el-button>
            <!-- 删除scope的行相对应id的那一行  实参 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部页码栏 -->
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

      <!-- 编辑弹窗 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
        <el-form :model="edits" :rules="rules">
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input
              v-model="edits.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="edits.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input v-model="edits.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="setbtn">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加用户弹窗 -->
      <el-dialog title="添加用户对话框" :visible.sync="adddialogFormVisible">
        <el-form :model="addusers" :rules="rules">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="addusers.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="addusers.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="addusers.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input v-model="addusers.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adddialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { UserAdmin, UserState, EditUserData, AddUser, DeleteUser } from '@/api/user'
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
      type: true,

      dialogFormVisible: false,
      adddialogFormVisible: false,

      formLabelWidth: '120px',
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]

      },
      edits: {
        id: 0,
        username: '',
        mobile: '',
        email: ''
      },
      // 添加用户存放数据的对象
      addusers: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    async UserAdmin () {
      // 接收useradmin的所有值
      const res = await UserAdmin({ query: this.input, pagenum: this.pagenum, pagesize: this.pagesize })
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
    },

    // 修改数据
    edit (data) {
      this.dialogFormVisible = true
      console.log(data) // 获取的是scope.row里的行内数据
      this.edits.id = data.id // 给data内edits传值
      this.edits.username = data.username
      this.edits.mobile = data.mobile
      this.edits.email = data.email
    },
    // 把修改后的数据提交到服务器
    async setbtn () {
      try {
        const res = await EditUserData(this.edits) // 接收服务器返回的值
        console.log(res)
        this.UserAdmin() // 重新渲染页面
        this.dialogFormVisible = false // 点击确认关闭弹窗
      } catch (err) {
        console.log(err)
      }
    },

    // 点击添加按钮弹出弹框
    adduser (data) {
      this.adddialogFormVisible = true
    },
    // 点击添加用户的确认按钮实现把数据上传到服务器
    async add () {
      const res = await AddUser(this.addusers) // 通过双向数据绑定获得的adduers对象 上传到服务器并接受返回值
      console.log(res)
      this.UserAdmin()
      this.adddialogFormVisible = false
    },

    // 删除
    deletefn (id) {
      // console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await DeleteUser(id) // 接收DeleteUser(id)对应的行内元素并删除
        // console.log(res)
        this.UserAdmin() // 重新渲染页面
        // 弹出提示页面
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
