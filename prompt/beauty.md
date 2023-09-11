<template>
    <div>
        <el-container>
            <el-main>
                <div class="chat-container">
                    <div v-for="record in chatRecords" :key="record.id"
                        :class="[record.user_type.startsWith('Me') ? 'chat-right' : 'chat-left']">
                        <el-card
                            :class="['chat-bubble', record.user_type.startsWith('Me') ? 'chat-bubble-right' : 'chat-bubble-left']">
                            <p>{{ record.data }}</p>
                            <small>{{ new Date(record.create_at).toLocaleString() }}</small>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getSpeechLog } from '../../services/apiService'

interface ChatRecord {
    id: number;
    team_uuid: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_type: string;
    irrelevant: boolean;
    data: string;
    create_at: string;
}

const chatRecords = ref<ChatRecord[]>([]);

const refreshData = async () => {
    var dataResponse = await getSpeechLog()

    chatRecords.value = dataResponse;

}

onMounted(async () => {
    await refreshData();
});

</script>
  
<style>
.chat-container {
    max-width: 800px;
    margin: auto;
}

.chat-left,
.chat-right {
    display: flex;
    margin-bottom: 10px;
}

.chat-left {
    justify-content: flex-start;
}

.chat-right {
    justify-content: flex-end;
}

.chat-bubble {
    max-width: 60%;
}

.chat-bubble-left {
    background-color: #f1f1f1;
}

.chat-bubble-right {
    background-color: #4caf50;
    color: white;
}
</style>

这个页面的功能已经很好了,但是需要调整一下样式
对于每个对话气泡,需要将白边尽可能缩小.
每个气泡上方，有一个 user_id:create_at 的 用户昵称小字展示。

还有一个需求是，每当对话的channel_id发生变化时,在聊天窗口中加入一条横线的分割线,分割线上写着新的channel_id
然后为页面提供一个内部的滚动条,不要用浏览器的.
页面加载时,自动滚动到最底部.