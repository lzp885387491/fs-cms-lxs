<template>
<div class="main">
    <el-input v-model="value" :disabled="disabled" >
            <template #append>
              <el-button :class="disabled ? '' : 'none'" :icon="icon" @click="btn(icon)" />
            </template>
    </el-input>
</div>
</template>

<script lang="ts" setup>
import { Edit, Select } from '@element-plus/icons-vue';
import { ref,toRefs } from 'vue';

const props = defineProps<{
    value:any
}>(); 
let { value } = toRefs(props);


let icon = ref(Edit);
let disabled = ref(true);

const btn = function(type:any){
    console.log(type.name);
    if (type.name == 'Edit') {
        disabled.value = false;
        icon.value = Select
    }
}
</script>

<style scoped></style>