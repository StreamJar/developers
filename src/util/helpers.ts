export interface IAction<T extends string> {
	type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
	payload: P;
}

export function action<T extends string>(type: T): IAction<T>;
export function action<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>;
export function action<T extends string, P>(type: T, payload?: P) {
	return payload === undefined ? { type } : { type, payload };
}

export type ActionsUnion<A extends { [actionCreator: string]: (...args: any[]) => any }> = ReturnType<A[keyof A]>;
