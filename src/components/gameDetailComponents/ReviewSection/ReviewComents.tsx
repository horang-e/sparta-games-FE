import ReviewCard from "./ReviewCard";
import reviewRegister from "../../../assets/gameDetail/reviewRegister.svg";
import ReviewRegisterModal from "./ReviewRegisterModal";
import { userStore } from "../../../share/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { TReviewResponse } from "../../../types";
import useGameDetail from "../../../hook/gameDetailHook/useGameDetail";
import { getGameMyReview, getGameReviews } from "../../../api/review";
import SpartaPagination from "../../../spartaDesignSystem/SpartaPagination";
import usePageHandler from "../../../hook/usePageHandler ";
import { useState } from "react";

const ReviewComents = ({ gamePk }: { gamePk: number }) => {
  const COUNT_PER_PAGE = 6;

  const { userData } = userStore();
  const { currentPage, onChangePage } = usePageHandler();
  const { more, onClickMoreToggleHandler } = useGameDetail();

  const { data: reviewData } = useQuery<TReviewResponse>({
    queryKey: ["reviews", currentPage],
    queryFn: () => getGameReviews(gamePk, currentPage, COUNT_PER_PAGE),
  });

  const { data: myReviewData } = useQuery<TReviewResponse>({
    queryKey: ["reviews", "my_review", gamePk],
    queryFn: () => getGameMyReview(gamePk, currentPage, COUNT_PER_PAGE),
    enabled: !!userData,
  });

  const allReviewData = reviewData?.results.all_reviews;
  const myReview = myReviewData?.results.my_review;

  const reviewsWithoutMyReview = allReviewData?.filter((review) => review.id !== myReview?.id);

  const isFirstPageVisible = currentPage !== 1 ? "hidden" : "";

  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-3xl font-DungGeunMo text-white">Review</p>
          <div className="flex gap-3 text-xl font-semibold text-white">
            <p className="cursor-pointer">최근 게시순</p>
            <p className="cursor-pointer">공감 많은순</p>
            <p className="cursor-pointer">비공감 많은 순</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {userData ? (
            !myReview ? (
              <div
                onClick={() => {
                  onClickMoreToggleHandler();
                  setIsRegister(true);
                }}
                className={`${isFirstPageVisible} flex items-center justify-center gap-6 h-[189px] border border-solid border-primary-500 bg-gray-800 rounded-xl cursor-pointer`}
              >
                <img src={reviewRegister} />
                <p className="text-white font-DungGeunMo text-2xl">내 리뷰 등록하기</p>
              </div>
            ) : (
              <div className={`${isFirstPageVisible}`}>
                <ReviewCard
                  onClickMoreToggleHandler={onClickMoreToggleHandler}
                  review={myReview}
                  isMyReview={!!myReview}
                  setIsRegister={setIsRegister}
                />
              </div>
            )
          ) : (
            <div
              className={`${isFirstPageVisible} flex items-center justify-center gap-6 px-11 h-[189px] border border-solid border-alert-default hover:border-alert-hover bg-gray-800 rounded-xl`}
            >
              <img src={reviewRegister} />
              <p className="text-white font-DungGeunMo text-2xl text-center leading-none">
                비회원은 리뷰등록이 불가능합니다.
              </p>
            </div>
          )}

          {reviewsWithoutMyReview?.map((review) => (
            <ReviewCard review={review} onClickMoreToggleHandler={onClickMoreToggleHandler} />
          ))}
        </div>
        <SpartaPagination
          dataTotalCount={userData ? myReviewData?.count : reviewData?.count}
          countPerPage={COUNT_PER_PAGE}
          onChangePage={onChangePage}
        />
      </section>

      <ReviewRegisterModal
        gamePk={gamePk}
        more={more}
        onClickMoreToggleHandler={onClickMoreToggleHandler}
        myReview={myReview}
        isRegister={isRegister}
      />
    </>
  );
};

export default ReviewComents;
