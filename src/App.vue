<script setup lang="ts">
import { ref, onMounted } from "vue";
import { login, loadGroup, createGroup, getMember } from "@/TUIKit/config/connectTUIKit";
import TUIKitComp from "@/components/TUIKitComponent/index.vue";

// const groupID = "@TGS#3ZHIWSNOU";
const groupID = "@TGS#3WP76SPOH";

onMounted(async () => {
	await login();
	const memberList = await loadGroup(groupID);
	console.log("memberList", memberList);
});

const group = ref("cat,dog");
const handleCreateGroup = async () => {
	const list = group.value.trim().split(",");
	const groupId = await createGroup(list);
	await loadGroup(groupId);
};
</script>

<template>
	<div class="container">
		<div class="side">
			<div class="box">
				<div>自动载入群组 {{ groupID }}</div>
			</div>
			<div class="box">
				<input v-model="group" />
				<button @click="handleCreateGroup">多人群组</button>
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
