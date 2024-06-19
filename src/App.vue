<script setup lang="ts">
import { onMounted } from "vue";
import { TUIChat } from "./TUIKit";
import { TUICallKit } from "@tencentcloud/call-uikit-vue";
import { login, loadGroup } from "./TUIKit/config/connectTUIKit";

// const groupID = "@TGS#3ZHIWSNOU";
const groupID = "@TGS#36I6KMNOK";

onMounted(async () => {
	await login();
	await loadGroup(groupID);
});
</script>

<template>
	<div class="TUIKit">
		<div class="TUIKit-main-container">
			<TUIChat> <div class="loading">loading</div> </TUIChat>
			<TUICallKit class="callkit-container" :allowedMinimized="true" :allowedFullScreen="false" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "./TUIKit/assets/styles/common.scss";
@import "./TUIKit/assets/styles/sample.scss";
.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
</style>
