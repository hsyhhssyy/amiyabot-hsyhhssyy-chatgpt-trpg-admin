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


现在请仿照上面的内容,编写一个世界观编辑控件

世界观jsonString的典型值为 "[\"约翰·威廉姆斯是个男性\", \"约翰·威廉姆斯住在苏活区咖啡馆附近\", \"约翰计划在圣约克律师事务所找律师处理民事纠纷\", \"警员都回到了苏格兰场\", \"医院有针对有色人种的裁员事件\", \"利物浦的医疗器具制造工厂供应了医院的器械\", \"阿尔伯特可能是问题的根源\", \"查普曼提到的亚伦医生可能在花街的一个小胡同里\", \"亚伦医生非正规医院或诊所可以缓解病人疼痛\", \"查普曼在回去的路上嘟囔道“这次可算大赚了一笔，那俩傻子”\", \"巨神兵发现情报零碎，需要整理\", \"巨神兵觉得有必要去医院探望被袭击的女孩\", \"阿发哥提出要将对话进行分线和逻辑理清\", \"渣渣可能买过颜料\", \"被害者中有一名妓女和教堂有关\", \"渣渣可能在苏活区杀人\", \"被害者坐车前都买过红酒\", \"凶手有在小卖部买红酒的行为\", \"可能有毒品的线索\", \"可以调查妓女和教会等有关被害者的信息\", \"颜料的来源可以和疯疯癫癫的画家联系\", \"可以调查阿尔伯特王子线索\", \"可以调查\\\"白色未来\\\"组织\", \"可以调查警长线索\", \"可以调查查普曼线索\", \"每条街都有小卖部\", \"超级赛亚人能飞、能打、能自愈\", \"阿发哥被黑叔叔偷光了\", \"阿发哥认为自己被一群白眼狼搞下台\", \"阿发哥说要抱着杀尽天下黑叔叔的心态去东区\", \"阿发哥计划晚上去苏格兰场，四花和神大也可能会去\", \"阿发哥建议继续跟踪查普曼或者艾伦医生\", \"阿发哥想了解更多关于“白色未来”组织的情报\", \"阿发哥说维金斯自告奋勇去盯梢北区旅馆\", \"阿发哥询问明天早上或中午是否需要在警局集合\", \"支票的使用需要签字和背书\", \"国内使用电子票更为普遍\", \"个人认为存银行更安全\", \"黑叔叔可能会抢劫阿米娅身上的钱\", \"阿米娅当前不在咖啡厅\", \"交叉目击案件，跟两起案件有关联\", \"阿米娅调查了两个地方：苏活酒馆和医院\", \"阿米娅可能前往画店和小卖部购买颜料\", \"有一个黑医生名叫亚伦·柯斯米斯基\", \"汤恩比馆的负责人是夏洛特，医生叫汤玛斯\", \"阿米娅听说过法兰克·迈尔斯和沃尔特·西克特\", \"阿发哥翻阅记录确认人物案子没有遗漏，有档案形式的布局\", \"英国帝国时代\", \"维多利亚女王统治下的英国\", \"加入神圣伟大的组织\", \"使英国重新伟大\"]"

请设计一个交互方式,使用ElementPlus的组件,不直接编辑文本,而是可以图形化的编辑json的各项属性.
