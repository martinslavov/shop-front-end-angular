import { Store, StoreConfig } from '@datorama/akita';

export type ContainerBasedState = {
}

export function createInitialContainerBasedState() : ContainerBasedState {
	return {};
}

@StoreConfig({ name: 'container-based' })
export class ContainerBasedStore extends Store<ContainerBasedState> {

	constructor() {
		super(createInitialContainerBasedState());
	}
}