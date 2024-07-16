import { TUILogin } from "@tencentcloud/tui-core";
import TencentCloudChat from "@tencentcloud/chat";
import TUIChatEngine, { TUIConversationService, TUIGroupService } from "@tencentcloud/chat-uikit-engine";
import { genTestUserSig } from "../../TUIKit";
import dayjs from "dayjs";

const thisTime = () => {
	const result = `${dayjs().get("year")}.${dayjs().get("month") + 1}.${dayjs().get("date")}.${dayjs().get(
		"hour"
	)}.${dayjs().get("minute")}`;
	return result;
};

// app information
// 我的腾讯云
const OPTIONS1 = {
	SDKAppID: 1600036474,
	secretKey: "a2725bb024b32ca85f2b151072f779010aabe0b00fd7e84e273c89eb44aa5404",
	userID: "cat",
};
const OPTIONS2 = {
	SDKAppID: 1600035034,
	secretKey: "b462d60651e806e7a71c1b5a85831b2c343070bdc4fcf4e69ad62364cabd3b92",
	userID: "554722094672257541",
};

export let OPTIONS: any = {};
OPTIONS = OPTIONS1;

let chat = TencentCloudChat.create({
	SDKAppID: OPTIONS.SDKAppID,
});

export const login = async () => {
	await TUILogin.login({
		SDKAppID: OPTIONS.SDKAppID,
		userID: OPTIONS.userID,
		userSig: genTestUserSig({
			SDKAppID: OPTIONS.SDKAppID,
			secretKey: OPTIONS.secretKey,
			userID: OPTIONS.userID,
		}).userSig,
		// 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true
		useUploadPlugin: true,
		// 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航
		// 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139
		// 如果您已购买内容审核服务，开启此功能请设置为 true
		useProfanityFilterPlugin: false,
		framework: "vue3",
	});
	TUILogin.setLogLevel(1);
};

export const loadGroup = async (groupID: string) => {
	const res = await TUIConversationService.switchConversation(`GROUP${groupID}`);
	console.log("载入群组成功", res);
	await new Promise((resolve) => setTimeout(resolve, 300));
	return await getMember(groupID);
};

export const createGroup = async (list: string[]) => {
	try {
		const pm: any = {
			// TUIChatEngine.TYPES.GRP_MEETING（临时会议群）
			type: TUIChatEngine.TYPES.GRP_MEETING,
			inviteOption: TUIChatEngine.TYPES.INVITE_OPTIONS_FREE_ACCESS,
			name: thisTime(),
			memberList: !list
				? [
						{
							userID: OPTIONS.userID,
						},
				  ]
				: list.map((v) => ({ userID: v })),
		};
		const res = await TUIGroupService.createGroup(pm);
		const {
			data: {
				group: { groupID },
			},
		} = res;
		console.log("创建群组成功，入参:", pm, "出参:", res.data);
		return groupID;
	} catch (e) {
		console.warn("创建群组失败：", e);
	}
};

// 获得当前群组成员列表
export const getMember = async (groupID: string) => {
	try {
		const {
			data: { memberList },
		} = await TUIGroupService.getGroupMemberList({ groupID: `${groupID}` });
		console.log("获取群组成员成功", memberList);
		return memberList;
	} catch (e) {
		console.warn("获取群组成员失败", e);
	}
};

export const loadChat = async (groupID: string) => {
	const res = await TUIConversationService.switchConversation(`C2C${groupID}`);
	console.log("载入单聊成功", res);
};
