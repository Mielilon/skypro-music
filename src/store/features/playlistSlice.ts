import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoriteTracks } from "@/api/tracks";
import { TrackListType, TrackType } from "@/types/tracks";
import { SORT_OPTIONS } from "../../constants";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (accessToken: string) => {
    const favoriteTracks = await fetchFavoriteTracks(accessToken);
    return favoriteTracks;
  }
);

type PlaylistStateType = {
  currentTrack: null | TrackType;
  shuffledPlaylist: TrackListType;
  currentPlaylist: TrackListType;
  filteredPlaylist: TrackListType;
  activeFilters: {
    genres: string[];
    authors: string[];
    sortOption: string;
    searchQuery: string;
  };
  isPlaying: boolean;
  isShuffle: boolean;
  likedTracks: number[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  currentPlaylist: [],
  shuffledPlaylist: [],
  filteredPlaylist: [],
  activeFilters: {
    genres: [],
    authors: [],
    sortOption: SORT_OPTIONS.DEFAULT,
    searchQuery: "",
  },
  isPlaying: false,
  isShuffle: false,
  likedTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<TrackListType>) => {
      state.currentPlaylist = action.payload;
      state.filteredPlaylist = action.payload;
    },
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
    setActiveFilters: (
      state,
      action: PayloadAction<{
        genres?: string[];
        authors?: string[];
        sortOption?: string;
        searchQuery?: string;
      }>
    ) => {
      const { genres, authors, sortOption, searchQuery } = action.payload;

      state.activeFilters.genres = genres ?? state.activeFilters.genres;
      state.activeFilters.authors = authors ?? state.activeFilters.authors;
      state.activeFilters.sortOption =
        sortOption ?? state.activeFilters.sortOption;
      state.activeFilters.searchQuery =
        searchQuery ?? state.activeFilters.searchQuery;

      let filteredPlaylist = state.currentPlaylist;

      if (state.activeFilters.genres.length > 0) {
        filteredPlaylist = filteredPlaylist.filter((track) =>
          state.activeFilters.genres.includes(track.genre)
        );
      }

      if (state.activeFilters.authors.length > 0) {
        filteredPlaylist = filteredPlaylist.filter((track) =>
          state.activeFilters.authors.includes(track.author)
        );
      }

      if (state.activeFilters.searchQuery) {
        filteredPlaylist = filteredPlaylist.filter(
          (track) =>
            track.name
              .toLowerCase()
              .includes(state.activeFilters.searchQuery.toLowerCase()) ||
            track.author
              .toLowerCase()
              .includes(state.activeFilters.searchQuery.toLowerCase())
        );
      }

      const sortFunctions: Record<
        string,
        (a: TrackType, b: TrackType) => number
      > = {
        [SORT_OPTIONS.NEW]: (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
        [SORT_OPTIONS.OLD]: (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      };

      const sortFunction = sortFunctions[state.activeFilters.sortOption];
      if (sortFunction) {
        filteredPlaylist = filteredPlaylist.sort(sortFunction);
      }

      state.filteredPlaylist = filteredPlaylist;
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
  setCurrentPlaylist,
  setActiveFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
