import actionTypes from "../actions/actionType";

const initState = {
    banner: null,
    trending: null,
    chill: null,
    top100: null,
    albumhot: null,
    newRelease: null,
    currentWidth: null
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                trending: action.homeData?.find(item => item.sectionId === 'hEditorTheme1') || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || null,
                top100: action.homeData?.find(item => item.sectionId === 'h100') || null,
                albumhot: action.homeData?.find(item => item.sectionId === 'hAlbum') || null,
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || null,
            }
        
        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                currentWidth: action.w
            }
        default:
            return state
    }
}

export default appReducer