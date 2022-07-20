<template>
  <div>
    <el-tag v-if="num === '0'">等级一</el-tag>
    <el-tag type="success" v-else-if="num === '1'">等级二</el-tag>
    <el-tag type="warning" v-else>等级三</el-tag>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      required: true
    }
  },
  created () { },
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

<style scoped lang='scss'>
</style>
