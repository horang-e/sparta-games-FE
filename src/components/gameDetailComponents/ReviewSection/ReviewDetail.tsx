import { Rating } from "@mui/material";
import closeBtn from "../../../assets/common/closeBtn.svg";
import { TReviewData } from "../../../types";
import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";

type Props = {
  review: TReviewData | undefined;
  convertDifficulty: (difficulty: number | undefined) => "EASY" | "NORMAL" | "HARD" | undefined;
  onClose: () => void;
};
const ReviewDetail = ({ review, convertDifficulty, onClose }: Props) => {
  const gameDifficulty: ("EASY" | "NORMAL" | "HARD")[] = ["EASY", "NORMAL", "HARD"];

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
      <div className="flex flex-col gap-4 p-5 w-[900px]">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-DungGeunMo text-primary-500">{[review?.author_name]} 의 리뷰</p>
          <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
        </div>

        <div className="flex items-center gap-8">
          <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">난이도</p>
          <div className="flex gap-3">
            {gameDifficulty.map((level) => (
              <DifficultyChip
                key={level}
                chipSize="big"
                difficultyLevel={level}
                isSelected={convertDifficulty(review?.difficulty) === level}
              />
            ))}
          </div>
          <div className="flex gap-3">{convertDifficulty(review?.difficulty)}</div>

          <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">평점</p>
          <Rating
            name="gameRating"
            value={review?.star}
            readOnly
            sx={{
              width: "120px",
            }}
            icon={<img src={fillStar} width={30} height={30} />}
            emptyIcon={<img src={star} width={30} height={30} />}
          />
        </div>

        <p className="min-h-60 text-base font-Pretendard text-white">{review?.content}</p>
      </div>
    </div>
  );
};

export default ReviewDetail;
