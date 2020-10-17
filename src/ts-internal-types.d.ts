import ts from "typescript";

declare module "typescript" {
	export interface SourceFile {
		externalModuleIndicator?: ts.Node;
	}

	export interface WellKnownSymbolExpression extends PropertyAccessExpression {
		expression: Identifier & {
			escapedText: "Symbol";
		};
		name: Identifier;
	}

	export type LiteralLikeElementAccessExpression = ElementAccessExpression &
		Declaration & {
			argumentExpression: StringLiteralLike | NumericLiteral | WellKnownSymbolExpression;
		};

	export type BindableStaticNameExpression = EntityNameExpression | BindableStaticElementAccessExpression;

	export type BindableStaticElementAccessExpression = LiteralLikeElementAccessExpression & {
		expression: BindableStaticNameExpression;
	};

	export type BindableStaticAccessExpression =
		| PropertyAccessEntityNameExpression
		| BindableStaticElementAccessExpression;

	export function isPrototypeAccess(node: Node): node is ts.BindableStaticAccessExpression;

	function isInstantiatedModule(node: ModuleDeclaration, preserveConstEnums: boolean): boolean;

	export interface TypeChecker {
		isTupleType(type: Type): boolean;
		isArrayLikeType(type: Type): boolean;
		getTrueType(): ts.Type;
		getFalseType(): ts.Type;
	}
}
