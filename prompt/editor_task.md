下面是我写的一段物品属性编辑器的vue代码,将一个json字符串展示在文本框中

<template>
  <div>
    <textarea v-model="jsonString" rows="10" cols="50"></textarea>
    <button @click="handleSave">保存</button>
  </div>
</template>

<script setup lang="ts">
import { ref,  watch } from 'vue';

const props = defineProps<{ data: any }>();
const emit = defineEmits();
const jsonString = ref("")

const refreshData = function(newData:any){
  var dataInData:string = newData.Data.param_value
  jsonString.value = dataInData;
}

refreshData(props.data)

watch(() => props.data, (newData) => {
  refreshData(newData)
});

const handleSave = () => {
  try {
    var dataInData = JSON.parse(jsonString.value);
    emit('updateData', dataInData);
  } catch (error) {
    alert('无效的 JSON 格式');
  }
};
</script>

其中,jsonString的典型值为 '[{"名称": "血书", "数量": 3, "单位": "份", "情报": []}, {"名称": "释迦阿米娅的签名", "数量": 3, "单位": "份", "情报": []}]'
