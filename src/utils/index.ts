export const arrCompare = <T, K extends keyof T>(
	beforeArr: T[],
	afterArr: T[],
	key: K,
	mode: "increase" | "decrease"
): T[] => {
	if (mode === "increase") {
		return beforeArr.filter((v) => {
			!afterArr.some((w) => {
				console.log(w, key);
				w[key] === v[key];
			});
		});
	} else {
		return afterArr.filter((v) => {
			!beforeArr.some((w) => w[key] === v[key]);
		});
	}
};
