import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface NutritionFact {
    productName: string;
    from: string;
    _id: string;
    servingSizeInOz: string;
    servingsPerContainer: string;
    ingredientList: string[];
    calories: number;
    totalFatInG: number;
    totalFatDV: number;
    saturatedFatInG: number;
    saturatedFatDV: number;
    transFatInG: number;
    polyunsatFatInG: number;
    monounsatFatInG: number;
    cholesterolInMg: number;
    cholesterolDV: number;
    sodiumInMg: number;
    sodiumDV: number;
    totalCarbsInG: number;
    totalCarbsDV: number;
    dietaryFiberInG: number;
    dietaryFiberDV: number;
    sugarsInG: number;
    addedSugarsInG: number;
    addedSugarsDV: number;
    proteinInG: number;
    proteinDV: number;
    vitaminDInMcg: string;
    vitaminDDV: number;
    calciumInMg: number;
    calciumDV: number;
    ironInMg: number;
    ironDV: number;
    potassiumInMg: number;
    potassiumDV: number;
    vitaminAInMcg: number;
    vitaminADV: number;
    vitaminCInMcg: number;
    vitaminCDV: number;
    vitaminEInMcg: number;
    vitaminEDV: number;
    vitaminKInMcg: number;
    vitaminKDV: number;
    thiamineInMg: string;
    thiamineDV: number;
    riboflavinInMg: string;
    riboflavinDV: number;
    niacinInMg: string;
    niacinDV: number;
    vitaminB6InMg: string;
    vitaminB6DV: number;
    folateMcgDFE: number;
    folateDV: number;
    vitaminB12InMg: number;
    vitaminB12DV: number;
    biotinInMcg: number;
    biotinDV: number;
    pantothenicAcidInMg: number;
    pantothenicAcidDV: number;
    phosphorusInMg: number;
    phosphorusDV: number;
    magnesiumInMg: number;
    magnesiumDV: number;
    zincInMg: string;
    zincDV: number;
    manganeseInMg: number;
    manganeseDV: number;
    chromiumInMcg: number;
    chromiumDV: number;
    percentJuice: number;
    caffeineInMg: number;
}

export interface ComponentSelectorState {
    isLoading: boolean;
    nutritionFacts: NutritionFact[];
}

interface RequestComponentUpdateAction {
    type: 'UPDATE_COMPONENT_REQUEST';
    name: string;
}

interface ResponseComponentUpdateAction {
    type: 'UPDATE_COMPONENT_RESPONSE';
    name: string;
}

interface RequestNutritionFacts {
    type: 'SET_NUTRITION_TO_STORE';
    payload: NutritionFact[];
}

type UpdateComponentKnownAction = RequestNutritionFacts | RequestComponentUpdateAction | ResponseComponentUpdateAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getNutritionFacts: (): AppThunkAction<any> => (dispatch, getState) => {
        const appState = getState();
        if (appState) {
            try {
                fetch(`api/nutrition`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => response.json() as Promise<NutritionFact[]>)
                    .then(data =>
                        dispatch({ type: 'SET_NUTRITION_TO_STORE', payload: data }));
            }
            catch (error) {
                alert('getCertificates error!' + error)
            }
        }
    }
};

const componentUnloadedState: ComponentSelectorState = { isLoading: false, nutritionFacts: [] };

export const simpleReducer: Reducer<ComponentSelectorState> = (state: ComponentSelectorState | undefined, componentUpdateAction: Action): ComponentSelectorState => {
    if (state === undefined) {
        return componentUnloadedState;
    }

    const action = componentUpdateAction as UpdateComponentKnownAction;
    switch (action.type) {
        case 'SET_NUTRITION_TO_STORE':
            return {
                ...state,
                nutritionFacts: action.payload,
            };
    }
    return state;
};
