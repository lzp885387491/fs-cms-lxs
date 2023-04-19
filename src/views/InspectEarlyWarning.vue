<template>
  <div class="inspect-early-warning">
    <div class="flex">
      <div class="table-title">在线监测预警</div>
    </div>

    <div class="mt-2">
      <el-table :data="newTableData" border scrollbar-always-on>
        <el-table-column prop="烟气动压pa" label="烟气动压pa" align="center" width="154" />
        <el-table-column prop="二氧化硫mg/m3" label="二氧化硫mg/m3" align="center" width="154" />
        <el-table-column prop="二氧化硫折算mg/m3" label="二氧化硫折算mg/m3" align="center" width="154" />
        <el-table-column prop="氧化物mg/m3" label="氧化物mg/m3" align="center" width="154" />
        <el-table-column prop="氧化物折算mg/m3" label="二氧化硫mg" align="center" width="155" />
        <el-table-column prop="烟尘mg/m3" label="烟尘mg/m3" align="center" width="154" />
        <el-table-column prop="烟尘折算mg/m3" label="烟尘折算mg/m3" align="center" width="155" />
        <el-table-column prop="02含量%" label="02含量%" align="center" width="155" />
        <el-table-column prop="烟气温度.C" label="烟气温度.C" align="center" width="155" />
        <el-table-column prop="烟气压力pa" label="烟气压力pa" align="center" width="155" />
        <el-table-column prop="烟气流速m/s" label="烟气流速m/s" align="center" width="155" />
        <el-table-column prop="废气m3/s" label="废气m3/s" align="center" width="155" />
      </el-table>
    </div>

    <div class="splitpage mt-2">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[2,5,10,20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="val"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const tableData = [
  {
    烟气动压pa: 0.055404,
    '二氧化硫mg/m3': 1.189,
    '二氧化硫折算mg/m3': 2.236,
    '氧化物mg/m3': 24.724,
    '氧化物折算mg/m3': 46.489,
    '烟尘mg/m3': 0.891,
    '烟尘折算mg/m3': 1.687,
    '02含量%': 17.277,
    '烟气温度.C': 46.4,
    '烟气湿度%': 1.072,
    烟气压力pa: -0.000117,
    '烟气流速m/s': 7.334,
    '废气m3/s': 30674.318
  },
  {
    烟气动压pa: 0.051325,
    '二氧化硫mg/m3': 0.491,
    '二氧化硫折算mg/m3': 0.9,
    '氧化物mg/m3': 26.291,
    '氧化物折算mg/m3': 48.132,
    '烟尘mg/m3': 0.814,
    '烟尘折算mg/m3': 1.506,
    '02含量%': 17.176,
    '烟气温度.C': 47.2,
    '烟气湿度%': 1.072,
    烟气压力pa: -0.000114,
    '烟气流速m/s': 7.059,
    '废气m3/s': 29430.664
  },
  {
    烟气动压pa: 0.045616,
    '二氧化硫mg/m3': 0.753,
    '二氧化硫折算mg/m3': 1.339,
    '氧化物mg/m3': 28.511,
    '氧化物折算mg/m3': 50.693,
    '烟尘mg/m3': 0.876,
    '烟尘折算mg/m3': 1.573,
    '02含量%': 17.063,
    '烟气温度.C': 48.175,
    '烟气湿度%': 1.025,
    烟气压力pa: -0.000117,
    '烟气流速m/s': 6.716,
    '废气m3/s': 27692.439
  },
  {
    烟气动压pa: 0.046017,
    '二氧化硫mg/m3': 0.809,
    '二氧化硫折算mg/m3': 1.492,
    '氧化物mg/m3': 24.303,
    '氧化物折算mg/m3': 44.787,
    '烟尘mg/m3': 0.877,
    '烟尘折算mg/m3': 1.633,
    '02含量%': 17.202,
    '烟气温度.C': 48.925,
    '烟气湿度%': 0.975,
    烟气压力pa: -0.000108,
    '烟气流速m/s': 6.687,
    '废气m3/s': 27766.127
  },
  {
    烟气动压pa: 0.053689,
    '二氧化硫mg/m3': 0.627,
    '二氧化硫折算mg/m3': 1.203,
    '氧化物mg/m3': 20.851,
    '氧化物折算mg/m3': 40.019,
    '烟尘mg/m3': 0.858,
    '烟尘折算mg/m3': 1.662,
    '02含量%': 17.353,
    '烟气温度.C': 49.35,
    '烟气湿度%': 0.925,
    烟气压力pa: -0.000118,
    '烟气流速m/s': 7.22,
    '废气m3/s': 29963.734
  },
  {
    烟气动压pa: 0.049396,
    '二氧化硫mg/m3': 0.882,
    '二氧化硫折算mg/m3': 1.704,
    '氧化物mg/m3': 20.233,
    '氧化物折算mg/m3': 39.102,
    '烟尘mg/m3': 0.961,
    '烟尘折算mg/m3': 1.875,
    '02含量%': 17.378,
    '烟气温度.C': 50.275,
    '烟气湿度%': 0.925,
    烟气压力pa: -0.000117,
    '烟气流速m/s': 6.925,
    '废气m3/s': 28658.891
  },
  {
    烟气动压pa: 0.043049,
    '二氧化硫mg/m3': 0.504,
    '二氧化硫折算mg/m3': 0.984,
    '氧化物mg/m3': 19.552,
    '氧化物折算mg/m3': 38.185,
    '烟尘mg/m3': 0.92,
    '烟尘折算mg/m3': 1.814,
    '02含量%': 17.416,
    '烟气温度.C': 51.1,
    '烟气湿度%': 0.975,
    烟气压力pa: -0.000111,
    '烟气流速m/s': 6.465,
    '废气m3/s': 26674.617
  },
  {
    烟气动压pa: 0.056106,
    '二氧化硫mg/m3': 1.368,
    '二氧化硫折算mg/m3': 2.681,
    '氧化物mg/m3': 20.032,
    '氧化物折算mg/m3': 39.262,
    '烟尘mg/m3': 0.824,
    '烟尘折算mg/m3': 1.633,
    '02含量%': 17.428,
    '烟气温度.C': 51.325,
    '烟气湿度%': 1.072,
    烟气压力pa: -0.000125,
    '烟气流速m/s': 7.38,
    '废气m3/s': 30394.213
  },
  {
    烟气动压pa: 0.06866,
    '二氧化硫mg/m3': 1.221,
    '二氧化硫折算mg/m3': 2.411,
    '氧化物mg/m3': 19.141,
    '氧化物折算mg/m3': 37.782,
    '烟尘mg/m3': 0.885,
    '烟尘折算mg/m3': 1.767,
    '02含量%': 17.454,
    '烟气温度.C': 51.3,
    '烟气湿度%': 1.122,
    烟气压力pa: -0.000121,
    '烟气流速m/s': 8.165,
    '废气m3/s': 30394.213
  },
  {
    烟气动压pa: 0.059373,
    '二氧化硫mg/m3': 1.047,
    '二氧化硫折算mg/m3': 2.059,
    '氧化物mg/m3': 19.571,
    '氧化物折算mg/m3': 38.493,
    '烟尘mg/m3': 0.901,
    '烟尘折算mg/m3': 1.792,
    '02含量%': 17.441,
    '烟气温度.C': 51.3,
    '烟气湿度%': 1.097,
    烟气压力pa: -0.000121,
    '烟气流速m/s': 7.592,
    '废气m3/s': 31264.844
  }
]
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val: number) => {
 pageSize4.value = val
}
const handleCurrentChange = (val: number) => {
 currentPage4.value = val
}
let val = computed(() => {
  return tableData.length
})
let newTableData = computed(() => {
  return tableData.slice(
    (currentPage4.value - 1) * pageSize4.value,
    currentPage4.value * pageSize4.value
  )
})
</script>

<style scoped>
.inspect-early-warning {
  box-sizing: border-box;
}
:deep(.el-table) {
  border: none !important;
}

.flex {
  display: flex;
}
.al-ju-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mt-1 {
  margin-top: 1rem;
}
.ml-1 {
  margin-left: 1rem;
}
</style>