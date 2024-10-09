import actionTypes from "./actionType" 

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playPlaylist = (flag) => ({
    type: actionTypes.SET_PLAYLIST,
    flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})
