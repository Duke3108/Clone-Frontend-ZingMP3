import actionTypes from "../actions/actionType";

const initState = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    atPlaylist: false,
    songs: null,
    isLoadingPlaylist: false,
    curPlaylistId: null,
    recentSongs: [],
    searchData: {},
    keyword: ''
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
        case actionTypes.LOADINGPLAYLIST:
            return {
                ...state,
                isLoadingPlaylist: action.flag
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            }
        case actionTypes.SET_CUR_PLAYLIST_ID:
                return {
                    ...state,
                    curPlaylistId: action.pid || null
                }
        case actionTypes.SET_RECENT:
            let songs = state.recentSongs
            if(action.data){
                if(state.recentSongs?.some(i => i.sid === action.data.sid)){
                    songs = songs.filter((i) => i.sid !== action.data.sid) 
                }
                if(songs.length > 19){
                    songs = songs.filter((i, index, arr) => index !== arr.length - 1)
                }
                songs = [action.data, ...songs]
            }
                return {
                    ...state,
                    recentSongs: songs
                }
        case actionTypes.SEARCH:
                return {
                    ...state,
                    searchData: action.data || null,
                    keyword: action.keyword || ''
                }
        default:
            return state
    }
}

export default musicReducer