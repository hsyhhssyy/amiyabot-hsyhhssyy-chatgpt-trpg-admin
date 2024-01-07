<template>
    <div class="container">
        <div class="left-panel">
            <!-- 添加下拉框 -->
            <el-select class="data-select" v-model="selectedTeam" placeholder="请选择" @change="dataSelectChange">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <ExecutionLogDataList :teamUuid="selectedTeam" v-model="selectedData"/>
        </div>

        <!-- 右侧组件 -->
        <div class="right-panel">
            <DeepCosplayEditor :data="selectedData"/>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import ExecutionLogDataList from '@src/components/lists/ExecutionLogDataList.vue';
import type { MappedData } from '@src/components/DataList';
import { listTeam } from '@src/services/apiService'
import DeepCosplayEditor from '@src/components/editors/ExecutionLogEditor.vue';

const options = ref<any[]>([]);
const selectedTeam = ref("")

const selectedData = ref<MappedData | null>(null);

const dataSelectChange = async () => {
    //selectedTeam.value = selectedTeam.value
}

onMounted(async () => {
  await refreshData();
});

const refreshData = async () => {
    var listResponse = await listTeam()
    options.value = listResponse.map((d: any) => ({
        label: d.team_uuid,
        value: d.team_uuid,
    }));
    // 按名称排序
    options.value.sort((a: any, b: any) => {
        return a.value.localeCompare(b.value)
    })
}

</script>
    
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 90%;
}

.left-panel {
    width: 200px;
    padding: 2px;
    background-color: #f3f4f6;
    margin-right: 10px;
}

.data-select {
    margin-bottom: 10px;
}

.right-panel {
    flex: 1;
    padding: 20px;
    background-color: #f3f4f6;
}
</style>
    