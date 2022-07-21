<template>
  <div>
    <el-row v-for="item in scope" :key="item.id" class="out">
      <el-col :span="4" class="left">
        <el-tag>{{ item.authName }}</el-tag>
      </el-col>
      <el-col :span="20">
        <el-row type="flex" v-for="obj in item.children" :key="obj.id">
          <el-col :span="6">
            <el-tag type="success">{{ obj.authName }}</el-tag>
          </el-col>
          <el-col :span="18">
            <el-tag v-for="obj1 in obj.children" :key="obj1.id" closable>{{
              obj1.authName
            }}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    scope: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log(this.scope)
  },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.out {
  border-bottom: 1px solid #999;
  padding: 20px 0px;
  margin: 0 80px;
  display: flex;
}
.el-tag{
  margin: 5px 5px;
}
</style>
