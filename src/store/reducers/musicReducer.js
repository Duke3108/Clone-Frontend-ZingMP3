import actionTypes from "../actions/actionType";

const initState = {
    curSongId: null,
    isPlaying: false,
    atPlaylist: false,
    songs: null
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return{
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return{
                ...state,
                isPlaying: action.flag
            }    
        case actionTypes.SET_PLAYLIST:
            return{
                ...state,
                atPlaylist: action.flag
            }
        case actionTypes.PLAYLIST:
            return{
                ...state,
                songs: action.songs || null
            }
        default:
            return state
    }
}

export default musicReducer