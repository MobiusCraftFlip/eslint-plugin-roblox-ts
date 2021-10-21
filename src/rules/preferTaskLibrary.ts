import { makeRule } from "../util/rules";

export const preferTaskLibraryName = "prefer-task-library";
export const preferTaskLibrary = makeRule<[], "preferTaskLibraryViolation">({
	name: "prefer-task-library",
	meta: {
		type: "problem",
		docs: {
			description: "Warns that use of the task library is preferred",
			category: "Possible Errors",
			recommended: "warn",
			requiresTypeChecking: false,
		},
		schema: [],
		messages: {
			preferTaskLibraryViolation: "Use of the task library is preferred",
		},
		fixable: "code",
	},
	defaultOptions: [],
	create(context) {
		return {
			CallExpression(node) {
				if (node.callee.type === "Identifier") {
					const name = node.callee.name;
					if (name === "wait" || name === "spawn" || name === "delay") {
						context.report({
							node: node,
							messageId: "preferTaskLibraryViolation",
							fix: fixer => fixer.replaceText(node.callee, `task.${name}`),
						});
					}
				}
			},
		};
	},
});
