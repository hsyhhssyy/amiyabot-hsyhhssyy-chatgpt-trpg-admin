<template>
    <div class="list-box">
        <div v-for="item in sortedList" :key="item.DisplayText" :class="{ 'is-selected': item === localCurrentData }"
            @click="selectData(item)">
            {{ item.DisplayText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { MappedData } from '@src/components/DataList';
import { getExecutionLog } from '@src/services/apiService'
import emitter from '@src/eventBus/mitt';

const emit = defineEmits();
const props = defineProps<{
    teamUuid: string;
    modelValue: MappedData | null;
}>();

const teamUuid = ref<string>("");
const localCurrentData = ref<MappedData | null>(null);
const sortedList = ref<MappedData[]>([]);

const refreshInterval = 5000; // 刷新间隔（毫秒）
let intervalId:any = null;

const refreshData = async () => {

    console.log("refreshData");

    var dataResponse = await getExecutionLog("deep-cosplay")

    var dataList = dataResponse.map((d: any): MappedData => ({
        DisplayText: d.create_at,
        Data: d,
    }));

    sortedList.value = [...dataList].sort((a, b) => b.DisplayText.localeCompare(a.DisplayText));

    if (sortedList.value.length > 0) {
        if(localCurrentData.value === null){
            localCurrentData.value = sortedList.value[0];
            emit('update:modelValue', sortedList.value[0]);
        }else{
            var currentData = sortedList.value.find(d => d.DisplayText === localCurrentData.value?.DisplayText);
            if(currentData === undefined){
                localCurrentData.value = sortedList.value[0];
                emit('update:modelValue', sortedList.value[0]);
            }else{
                localCurrentData.value = currentData;
            }
        }
    }
}

onMounted(async () => {
    await refreshData();
    intervalId = setInterval(refreshData, refreshInterval);
    emitter.on('execution-log-updated', refreshData);
});

onUnmounted(() => {
    clearInterval(intervalId);
    emitter.off('execution-log-updated', refreshData);
});

watch(() => props.teamUuid, async (newData) => {
    teamUuid.value = newData;
    await refreshData();
});

watch(() => props.modelValue, (newData) => {
    localCurrentData.value = newData;
});

const selectData = (data: MappedData) => {
    localCurrentData.value = data;
    emit('update:modelValue', data);
};
</script>
  
  
<style>
.list-box {
    padding: 10px;
}

.is-selected {
    background-color: #8a8a8ad3;
    text-align: center;
}
</style>
  