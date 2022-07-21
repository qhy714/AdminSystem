<template>
  <div>
    <!-- check-change只要修改复选框，数据就会触发 -->
    <el-tree
      @check-change="checkFn"
      ref="tree"
      :data="data"
      default-expand-all
      show-checkbox
      node-key="id"
      :props="{ label: 'authName' }"
    ></el-tree>
  </div>
</template>

<script>
import { permissionTree } from '@/api/permission'

export default {
  created () {
    this.permissionTree()
  },
  data () {
    return {
      data: [],
      arr: []
    }
  },
  methods: {
    async permissionTree () {
      const res = await permissionTree()
      console.log(res)
      this.data = res.data.data
    },
    checkFn () {
      this.arr = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      this.$emit('tree', this.arr)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
