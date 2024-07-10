<script setup lang="ts">
import { defineComponent, reactive, ref, onMounted, watch } from "vue";
import type { FormInstance } from "ant-design-vue";

const visible = ref<boolean>(false);

const showModal = () => {
	// visible.value = true;
	const message = {
		text: "Hello parent!",
	};

	// 发送消息到父页面
	// 确保替换为你父页面的确切源
	window.parent.postMessage(message, "*");
};

const handleOk = (e: boolean) => {
	visible.value = false;
	setTimeout(resetForm, 1000);
};
watch(visible, (newVal) => {
	if (newVal) {
		formState.pass = "111";
		formState.checkPass = "2";
		formState.age = 1;
		console.log("i");
	}
});

defineComponent({
	name: "App",
});

interface FormState {
	pass: string;
	checkPass: string;
	age: number | undefined;
}
onMounted(() => {});

const xx = () => {
	showModal();
};

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
	pass: "",
	checkPass: "",
	age: undefined,
});
let checkAge = async (_rule: Rule, value: number) => {
	if (!value) {
		return Promise.reject("Please input the age");
	}
	if (!Number.isInteger(value)) {
		return Promise.reject("Please input digits");
	} else {
		if (value < 18) {
			return Promise.reject("Age must be greater than 18");
		} else {
			return Promise.resolve();
		}
	}
};
let validatePass = async (_rule: Rule, value: string) => {
	if (value === "") {
		return Promise.reject("Please input the password");
	} else {
		if (formState.checkPass !== "") {
			formRef.value.validateFields("checkPass");
		}
		return Promise.resolve();
	}
};
let validatePass2 = async (_rule: Rule, value: string) => {
	if (value === "") {
		return Promise.reject("Please input the password again");
	} else if (value !== formState.pass) {
		return Promise.reject("Two inputs don't match!");
	} else {
		return Promise.resolve();
	}
};

const rules: Record<string, Rule[]> = {
	pass: [{ required: true, validator: validatePass, trigger: "change" }],
	checkPass: [{ validator: validatePass2, trigger: "change" }],
	age: [{ validator: checkAge, trigger: "change" }],
};
const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
	console.log(values, formState);
};
const handleFinishFailed = (errors) => {
	console.log(errors);
};
const resetForm = () => {
	formRef.value.resetFields();
	console.log(formState);
};
const handleValidate = (...args) => {
	console.log(args);
};

window.addEventListener(
	"message",
	function (event) {
		if (event.origin === "http://localhost:3101") {
			console.log("Message from iframe:", event.data);
			// 根据消息内容执行相应操作，例如刷新页面或显示登录提示
		}
	},
	false
);
</script>

<template>
	<a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk(1)" @cancel="handleOk(0)">
		<a-form
			ref="formRef"
			name="custom-validation"
			:model="formState"
			:rules="rules"
			v-bind="layout"
			@finish="handleFinish"
			@validate="handleValidate"
			@finishFailed="handleFinishFailed"
		>
			<a-form-item has-feedback label="Password" name="pass">
				<a-input v-model:value="formState.pass" type="password" autocomplete="off" />
			</a-form-item>
			<a-form-item has-feedback label="Confirm" name="checkPass">
				<a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
			</a-form-item>
			<a-form-item has-feedback label="Age" name="age">
				<a-input-number v-model:value="formState.age" />
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" html-type="submit">Submit</a-button>
				<a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
			</a-form-item>
		</a-form>
	</a-modal>
	<a-button @click="xx">ddd</a-button>
</template>

<style scoped></style>
