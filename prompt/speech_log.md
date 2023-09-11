我现在正在使用vue3+vite开发一个前端，他已经安装好了router，ElementPlus，axios
他使用响应式布局，组合式API，<script setup lang="ts">，并且对每一个数据类型都给出了interface
我现在已经成功制作好了一个主页，带有侧边栏，并且调试通过。

现在请编写一个对话记录管理页面,需求如下:

假如通过某个后端api可以获取对话的记录的数组,其典型值如下所示:

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

请设计一个页面,使用ElementPlus的组件,以聊天气泡的形式展示聊天的内容.
其中user_type=Me(Bot)或者Me(Human)的是我,显示在聊天窗口的右侧.剩下的人的话显示在聊天窗口的左侧.
