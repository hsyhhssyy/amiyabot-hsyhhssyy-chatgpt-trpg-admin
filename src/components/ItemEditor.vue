<template>
  <div>
    <textarea v-model="jsonString" rows="10" cols="50"></textarea>
    <button @click="handleSave">保存</button>
  </div>
</template>

<script setup lang="ts">
import { ref,  watch, watchEffect } from 'vue';

const props = defineProps<{ data: any }>();
const emit = defineEmits();

let parsedData = ref(props.data);

watch(() => props.data, (newData) => {
  parsedData.value = newData;
});

let jsonString = ref(JSON.stringify(parsedData.value, null, 2));

watchEffect(() => {
  jsonString.value = JSON.stringify(parsedData.value, null, 2);
});

const handleSave = () => {
  try {
    parsedData.value = JSON.parse(jsonString.value);
    emit('updateData', parsedData.value);
  } catch (error) {
    alert('无效的 JSON 格式');
  }
};
</script>
