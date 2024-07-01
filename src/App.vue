<script setup lang="ts">
import { ref, onMounted } from "vue";
import { login, loadGroup, createGroup } from "@/TUIKit/config/connectTUIKit";
import TUIKitComp from "@/components/TUIKitComponent/index.vue";
import { arrCompare } from "@/utils";

// const groupID = "@TGS#3ZHIWSNOU";
const groupID = "@TGS#3WP76SPOH";

onMounted(async () => {
	await login();
	memberList.value = await loadGroup(groupID);
});

const memberList = ref<any[]>([]);

const groupCreate = ref("cat,dog");
const handleCreateGroup = async () => {
	const list = groupCreate.value.trim().split(",");
	const groupId = await createGroup(list);
	await loadGroup(groupId);
};

const groupUpdate = ref("cat, cook");
const handleUpdateMemberList = async () => {
	const list = groupUpdate.value.trim().split(",");
	console.log(arrCompare(memberList.value, list, "nick", "increase"));
	console.log(arrCompare(memberList.value, list, "nick", "decrease"));
};
</script>

<template>
	<div class="container">
		<div class="side">
			<div class="box">
				<div>自动载入群组 {{ groupID }}</div>
				<div>
					群组成员
					<template v-for="o in memberList">
						{{ o.nick }}
					</template>
				</div>
			</div>
			<div class="box">
				<input v-model="groupCreate" />
				<button @click="handleCreateGroup">多人群组</button>
			</div>
			<div class="box">
				<input v-model="groupUpdate" />
				<button @click="handleUpdateMemberList">更新群组成员</button>
			</div>
		</div>
		<div class="main">
			<TUIKitComp />
		</div>
	</div>
</template>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	font-size: 12px;
}
.container {
	display: flex;
	width: 100wh;
	height: 100vh;
}
.side {
	flex: 0 0 400px;
	border-right: 1px solid #eee;
}
.box {
	margin: 0 5px;
	padding: 15px 5px;
	border-bottom: 1px solid #eee;
}
.main {
	flex: 1;
}
</style>
