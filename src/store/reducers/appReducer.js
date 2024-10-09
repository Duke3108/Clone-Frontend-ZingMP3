import actionTypes from "../actions/actionType";

const initState = {
    banner: [],
    trending: {}
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                trending: action.homeData?.find(item => item.sectionId === 'hEditorTheme1') || {}
            }
            
    
        default:
            return state
    }
}

export default appReducer