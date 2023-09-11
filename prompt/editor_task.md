下面是我写的一段物品属性编辑器的vue代码,将一个json字符串展示在文本框中

<template>
  <div>
    <el-card v-for="(item, index) in dataInData" :key="index" class="box-card">
      <el-form :model="item" label-width="60px">
        <el-form-item label="名称：">
          <div style="display: flex; width: 100%;">
            <el-input v-model="item.名称" style="flex: 1;"></el-input>
            <el-button @click="removeItem(index)" type="danger" style="margin-left: 20px;">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="数量：">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input-number v-model="item.数量"></el-input-number>
            </el-col>
            <el-col :span="12">
              <el-input v-model="item.单位"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="情报：">
          <div>
            <el-tag style="margin: 2px;" v-for="(info, infoIndex) in item.情报" :key="infoIndex" closable @close="removeInfo(index, infoIndex)">
              {{ info }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input v-model="newInfo[index]" @keyup.enter="addInfo(index)"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button @click="addInfo(index)">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button @click="addNewItem">添加新项</el-button>
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{ data: any }>();
const emit = defineEmits();

const newInfo = ref<string[]>([]);

// 初始化一个可观察的数据对象
const dataInData = ref<any[]>([]);

const refreshData = (newData: any) => {
  try {
    dataInData.value = JSON.parse(newData.Data.param_value);
  } catch (error) {
    ElMessage.error('无效的 JSON 数据');
  }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
  refreshData(newData);
});

const addNewItem = () => {
  dataInData.value.push({ "名称": "", "数量": 0, "单位": "", "情报": [] });
};

const removeItem = (index: number) => {
  dataInData.value.splice(index, 1);
};

const addInfo = (index: number) => {
  if (newInfo.value[index]) {
    dataInData.value[index].情报.push(newInfo.value[index]);
    newInfo.value[index] = '';
  }
};

const removeInfo = (index: number, infoIndex: number) => {
  dataInData.value[index].情报.splice(infoIndex, 1);
};

const handleSave = () => {
  try {
    emit('updateParamValue', JSON.stringify(dataInData.value));
  } catch (error) {
    ElMessage.error('无效的 JSON 数据');
  }
};
</script>

<style>
.box-card {
  margin-bottom: 20px;
}
</style>


现在请仿照上面的内容,编写一个对话记录管理控件

通过某个后端api可以获取对话的记录的数组,其典型值如下所示:

[
            {
                "id": 6,
                "team_uuid": "test-team",
                "channel_id": "817427809",
                "channel_name": "",
                "user_id": "457586001",
                "user_type": "Me(Bot)",
                "irrelevant": false,
                "data": "兔兔有一个提议，我们可以先去窗台查查是不是有新的线索",
                "create_at": "2023-09-10T11:33:22"
            },
            {
                "id": 7,
                "team_uuid": "test-team",
                "channel_id": "817427809",
                "channel_name": "",
                "user_id": "457586001",
                "user_type": "Me(Bot)",
                "irrelevant": false,
                "data": "如果没找到任何东西的话，兔兔建议接着去医院和画店调查",
                "create_at": "2023-09-10T11:33:22"
            },
            {
                "id": 8,
                "team_uuid": "test-team",
                "channel_id": "817427809",
                "channel_name": "",
                "user_id": "576491359",
                "user_type": "OtherPC",
                "irrelevant": false,
                "data": "四夕水在想，敏捷低最大的两个问题是先攻不足，和速度不够。",
                "create_at": "2023-09-10T19:27:24"
            },
            {
                "id": 9,
                "team_uuid": "test-team",
                "channel_id": "817427809",
                "channel_name": "",
                "user_id": "576491359",
                "user_type": "OtherPC",
                "irrelevant": false,
                "data": "先攻可以用射程弥补，移动速度的话……可以搞个坐骑。",
                "create_at": "2023-09-10T19:28:51"
            }]

请设计一个交互方式,使用ElementPlus的组件,以聊天气泡的形式展示聊天的内容.
