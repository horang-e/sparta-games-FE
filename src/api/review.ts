import { sparta_games, sparta_games_auth } from "./axios";

export const getGameReviews = async (gamePk: number) => {
  try {
    const res = await sparta_games.get(`/games/api/list/${gamePk}/reviews/`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};
export const getGameMyReview = async (gamePk: number) => {
  try {
    const res = await sparta_games_auth.get(`/games/api/list/${gamePk}/reviews/`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};
export const postGameReviews = async (
  gamePk: number,
  star: number | null,
  content: string,
  difficulty: number | undefined,
) => {
  try {
    const res = await sparta_games_auth.post(`/games/api/list/${gamePk}/reviews/`, {
      star: star,
      content: content,
      difficulty: difficulty,
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};

export const putGameReview = async (
  reviewId: number | undefined,
  gamePk: number | undefined,
  difficulty: number | undefined,
  star: number | null,
  preStar: number | undefined,
  content: string,
) => {
  try {
    await sparta_games_auth.put(`/games/api/review/${reviewId}/`, {
      game_pk: gamePk,
      difficulty: difficulty,
      star: star,
      pre_star: preStar,
      content: content,
    });
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};

export const deleteGameReview = async (reviewId: number | undefined, game_pk: number | undefined) => {
  try {
    const res = await sparta_games_auth.delete(`/games/api/review/${reviewId}/`, {
      data: { game_pk },
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};

export const postReviewLike = async (reviewId: number | undefined, action: "like" | "dislike") => {
  try {
    await sparta_games_auth.post(`/games/api/review/${reviewId}/like/`, {
      action: action,
    });
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error.message);
    }
  }
};
