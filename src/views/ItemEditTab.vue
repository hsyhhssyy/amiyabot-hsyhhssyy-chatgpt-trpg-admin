<template>
  <div>
    <DataList :dataList="dataList" :currentData="selectedData" @selectData="selectData" />
    <ItemEditor v-if="selectedData" :data="selectedData" @updateData="updateData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataList from '../components/DataList.vue';
import ItemEditor from '../components/ItemEditor.vue';

const dataList = ref([{DisplayText:"123",Data:"456"},{DisplayText:"1234",Data:"4567"}]); // 从后端获取的数据列表
const selectedData = ref(null);

const selectData = (data) => {
  selectedData.value = data;
};

const updateData = (newData) => {
  selectedData.value = newData;
};

</script>
