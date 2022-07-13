<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="1"> </el-col>
        <el-col :span="8"><div class="grid-text">后台管理系统</div></el-col>
        <el-col :span="15"><el-button @click="$router.back('/login')">退出</el-button></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div @click="isCollapse = !isCollapse" class="kaiguan">|||</div>

        <el-menu
          active-text-color="#fff"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#373d41"
          text-color="#fff"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"
                ><i class="el-icon-menu"></i>用户列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"
                ><i class="el-icon-menu"></i>角色列表</el-menu-item
              >
              <el-menu-item index="2-2"
                ><i class="el-icon-menu"></i>权限列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"
                ><i class="el-icon-menu"></i>商品列表</el-menu-item
              >
              <el-menu-item index="3-2"
                ><i class="el-icon-menu"></i>分类参数</el-menu-item
              >
              <el-menu-item index="3-3"
                ><i class="el-icon-menu"></i>商品分类</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"
                ><i class="el-icon-menu"></i>订单列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1"
                ><i class="el-icon-menu"></i>数据报表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;

  .el-header {
    background-color: #373d41;

    img {
      height: 60px;
      width: 60px;
    }
    .grid-text {
      color: #fff;
      font-size: 24px;
      line-height: 60px;
      margin-left: 10px;
    }
    .el-button {
      float: right;
      width: 70px;
      height: 40px;
      padding: 12px 20px;
      margin-top: 10px;
      border-radius: 0;
    }
  }
  .el-aside {
    background-color: #373d41;
  }
  /deep/ .el-menu {
    border-right: none;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .kaiguan {
    width: 100%;
    background-color: rgb(92, 89, 89);
    color: #fff;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
