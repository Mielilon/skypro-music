import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getFavoriteTracks } from "@/store/features/playlistSlice";

export default function useInitializeLikedTracks() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens.access) {
      dispatch(getFavoriteTracks(tokens.access));
    }
  }, [tokens, dispatch]);
}
