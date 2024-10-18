import actionTypes from "../actions/actionType";

const initState = {
    banner: [],
    trending: {},
    chill: {},
    top100: {},
    albumhot: {},
    newRelease: {},
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                trending: action.homeData?.find(item => item.sectionId === 'hEditorTheme1') || {},
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                albumhot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
            }
        
        default:
            return state
    }
}

export default appReducer