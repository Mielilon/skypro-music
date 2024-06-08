import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackListType, TrackType } from "@/types/tracks";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (accessToken: string, thunkAPI) => {
    const favoriteTracks = await fetchFavoriteTracks(accessToken);
    return favoriteTracks;
  }
);

type PlaylistStateType = {
  currentTrack: null | TrackType;
  shuffledPlaylist: TrackListType;
  currentPlaylist: TrackListType;
  isPlaying: boolean;
  isShuffle: boolean;
  likedTracks: number[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  currentPlaylist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffle: false,
  likedTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{
        currentTrack: TrackType;
        currentPlaylist: TrackListType;
      }>
    ) => {
      state.currentTrack = action.payload.currentTrack;
      state.currentPlaylist = action.payload.currentPlaylist;
      state.shuffledPlaylist = [...action.payload.currentPlaylist].sort(
        () => 0.5 - Math.random()
      );
    },
    togglePlay: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload) {
        state.isPlaying = action.payload;
        return;
      }
      state.isPlaying = !state.isPlaying;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    nextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;

      const currentIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const nextIndex = currentIndex + 1;

      if (nextIndex >= playlist.length) {
        state.currentTrack = playlist[0];
      } else {
        state.currentTrack = playlist[nextIndex];
      }
    },
    prevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;

      const currentIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const prevIndex = currentIndex - 1;

      if (prevIndex < 0) {
        state.currentTrack = playlist[playlist.length - 1];
      } else {
        state.currentTrack = playlist[prevIndex];
      }
    },
    likeTrack: (state, action: PayloadAction<number>) => {
      if (!state.likedTracks.includes(action.payload)) {
        state.likedTracks.push(action.payload);
      }
    },
    dislikeTrack: (state, action: PayloadAction<number>) => {
      state.likedTracks = state.likedTracks.filter(
        (id) => id !== action.payload
      );
    },
    setLikedTracks: (state, action: PayloadAction<number[]>) => {
      state.likedTracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action) => {
      state.likedTracks = action.payload.map((track: TrackType) => track.id);
    });
  },
});

export const {
  setCurrentTrack,
  togglePlay,
  toggleShuffle,
  prevTrack,
  nextTrack,
  likeTrack,
  dislikeTrack,
  setLikedTracks,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
