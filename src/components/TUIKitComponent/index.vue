<script setup lang="ts">
defineOptions({
	name: "TUIKitComponent",
});
import { TUIChat } from "@/TUIKit";
import { TUICallKit } from "@tencentcloud/call-uikit-vue";
</script>

<template>
	<div class="TUIKit">
		<div class="TUIKit-main-container">
			<TUIChat> <div class="loading">loading</div> </TUIChat>
			<TUICallKit class="callkit-container" :allowedMinimized="true" :allowedFullScreen="false" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "@/TUIKit/assets/styles/common.scss";
@import "@/TUIKit/assets/styles/sample.scss";
.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
</style>
