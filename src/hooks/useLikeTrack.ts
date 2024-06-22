import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  likeTrack as likeTrackAction,
  dislikeTrack as dislikeTrackAction,
} from "@/store/features/playlistSlice";
import { dislikeTrack, likeTrack } from "../api/tracks";

export const useLikeTrack = (trackId: number) => {
  const dispatch = useAppDispatch();

  const tokens = useAppSelector((state) => state.user.tokens);
  const user = useAppSelector((state) => state.user.user);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);

  const isLiked = likedTracks.includes(trackId);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!tokens.access || !tokens.refresh || !user) {
      return alert("Авторизуйтесь, чтобы добавить трек в избранное");
    }

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId,
        access: tokens.access,
        refresh: tokens.refresh,
      });
      if (isLiked) {
        dispatch(dislikeTrackAction(trackId));
      } else {
        dispatch(likeTrackAction(trackId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isLiked, handleLike };
};
