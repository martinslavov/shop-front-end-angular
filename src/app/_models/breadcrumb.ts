export interface IBreadcrumb {
	id: number;
	parentId: number;
	path: string;
	text: string;
	active: boolean;
}