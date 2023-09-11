<template>
    <div>
        <el-container>
            <el-main>
                <div class="chat-container">
                    <div ref="chatBox">
                        <div v-for="(record, index) in chatRecords">
                            <div v-if="index === 0 || chatRecords[index - 1].channel_id !== record.channel_id"
                                class="channel-divider">
                                <hr>
                                <div>{{ record.channel_id }}</div>
                                <hr>
                            </div>
                            <div :key="record.id"
                                :class="[record.user_type.startsWith('Me') ? 'chat-right' : 'chat-left']">
                                <div class="chat-info">
                                    <small>{{ record.user_id }}:{{ new Date(record.create_at).toLocaleString() }}</small>
                                </div>
                                <el-card
                                    :class="['chat-bubble', record.user_type.startsWith('Me') ? 'chat-bubble-right' : 'chat-bubble-left']">
                                    <div class="chat-body">
                                        <p>{{ record.data }}</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup lang="ts">
import { ref,onMounted,nextTick } from 'vue';
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
const chatBoxRef = ref<any>(null);

const refreshData = async () => {
    var dataResponse = await getSpeechLog()

    chatRecords.value = dataResponse;

}

onMounted(async () => {
    await refreshData();
    await nextTick(); // 等待 DOM 更新
    if(chatBoxRef.value){
        chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
    }
});

</script>
  
<style>
.chat-container {
    max-width: 800px;
    margin: auto;
    overflow-y: auto;
    height: 100vh;
}

.channel-divider {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.chat-left,
.chat-right {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.chat-left {
    align-items: flex-start;
}

.chat-right {
    align-items: flex-end;
}

.chat-info {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
}

.chat-bubble {
    max-width: 60%;
    padding: 2px; /* 可以调整这里以缩小白边 */
}

.chat-bubble-left {
    background-color: #f1f1f1;
}

.chat-bubble-right {
    background-color: #4caf50;
    color: white;
}

.chat-body {
    text-align: center;
    margin-bottom: -30px;
    margin-top: -30px;
    margin-left: -10px;
    margin-right: -10px;
}
</style>
  