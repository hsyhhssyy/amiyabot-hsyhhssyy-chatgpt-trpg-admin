<template>
    <div class="container">
        <div class="left-panel">
            <ExecutionLogDataList teamUuid="deep-cosplay" v-model="selectedData"/>
        </div>

        <!-- 右侧组件 -->
        <div class="right-panel">
            <DeepCosplayEditor :data="selectedData"/>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, } from 'vue';
import ExecutionLogDataList from '@src/components/lists/ExecutionLogDataList.vue';
import type { MappedData } from '@src/components/DataList';
import DeepCosplayEditor from '@src/components/editors/ExecutionLogEditor.vue';

const selectedData = ref<MappedData | null>(null);

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
    