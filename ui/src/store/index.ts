import * as SimpleSelector from './simpleStore';

export interface ApplicationState {
    selector: SimpleSelector.ComponentSelectorState | undefined;
}
export const reducers = {
    selector: SimpleSelector.simpleReducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
