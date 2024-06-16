<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TUIStore, StoreName, TUIConversationService } from "@tencentcloud/chat-uikit-engine";
import { TUIChat } from "./TUIKit";
import { TUICallKit } from "@tencentcloud/call-uikit-vue";
import { loadGroup } from "./TUIKit/config/connectTUIKit";

const groupID = "@TGS#3ZHIWSNOU";

onMounted(() => {
	// setTimeout(() => loadGroup(groupID), 1500);
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
