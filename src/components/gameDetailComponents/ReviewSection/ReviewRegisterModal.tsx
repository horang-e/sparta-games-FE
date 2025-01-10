import { SetStateAction, Dispatch, useState, useEffect } from "react";

import { Modal, Box } from "@mui/material";
import Rating from "@mui/material/Rating";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./reactQuillStyle.css";

import useReview from "../../../hook/gameDetailHook/useReview";

import DifficultyChip from "../../common/chipComponents/DifficultyChip";

import closeBtn from "../../../assets/common/closeBtn.svg";
import star from "../../../assets/star.svg";
import fillStar from "../../../assets/fillStar.svg";
import grayStar from "../../../assets/grayStar.svg";

type Props = {
  modalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const ReviewRegisterModal = ({ modalOpen, setOpenModal }: Props) => {
  const [ratingValue, setRatingValue] = useState<number | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const { form, eventHandler } = useReview();

  const gameDifficulty: ("EASY" | "NORMAL" | "HARD")[] = ["EASY", "NORMAL", "HARD"];

  const onHoverEnter = () => {
    setIsHovered(true);
  };

  const onHoverLeave = () => {
    setIsHovered(false);
  };

  const handleSelectDifficulty = (level: "EASY" | "NORMAL" | "HARD") => {
    setSelectedDifficulty(level);
  };

  const difficultyValue = () => {
    switch (selectedDifficulty) {
      case "EASY":
        return 0;
      case "NORMAL":
        return 1;
      case "HARD":
        return 2;
    }
  };

  useEffect(() => {
    form.register("content", {
      required: "필수",
      minLength: 3,
    });
  }, [form.register]);

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 후 다 지울 경우 생기는 <p></br></p> 부분 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : editorState;

    form.setValue("content", cleanedContent, { shouldValidate: true });
  };

  const editorContent = form.watch("content");

  console.log("난이도:", difficultyValue(), "별점:", ratingValue, "리뷰 내용:", editorContent, form.formState.isValid);
  return (
    <Modal open={modalOpen}>
      <Box className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-primary-500 rounded-xl bg-gray-800 outline-none">
        <div className="flex flex-col gap-4 p-5 w-[900px]">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-DungGeunMo text-primary-500">리뷰등록</p>
            <img onClick={() => setOpenModal(false)} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
          </div>

          <div className="flex items-center gap-8">
            <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">게임의 난이도는?</p>
            <div className="flex gap-3">
              {gameDifficulty.map((level) => (
                <DifficultyChip
                  key={level}
                  chipSize="big"
                  difficultyLevel={level}
                  selectedDifficulty={selectedDifficulty}
                  isSelected={selectedDifficulty === level}
                  onClick={() => handleSelectDifficulty(level)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-14">
            <p className="text-2xl font-DungGeunMo text-white">게임의 점수는?</p>

            <Rating
              name="gameRating"
              value={ratingValue}
              onChange={(event: React.SyntheticEvent, newValue: number | null): void => {
                setRatingValue(newValue);
              }}
              sx={{
                width: "120px",
              }}
              icon={<img src={fillStar} width={30} height={30} />}
              emptyIcon={<img src={ratingValue === null && !isHovered ? grayStar : star} width={30} height={30} />}
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            />
          </div>

          <div className="flex items-start gap-10">
            <div>
              <p className="text-2xl font-DungGeunMo text-white whitespace-nowrap">리뷰내용 입력</p>
              <span className="text-sm font-DungGeunMo text-white">(최대 300자)</span>
            </div>

            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={handleEditorChange}
              modules={{
                toolbar: false,
              }}
              placeholder="소중한 리뷰 감사합니다 :)"
              className="p-2 w-full h-full"
            />
          </div>

          <button
            disabled={!form.formState.isValid || ratingValue === null || selectedDifficulty === ""}
            className={`w-full h-12 text-title-18 rounded-md ${
              !form.formState.isValid || ratingValue === null || selectedDifficulty === ""
                ? "bg-gray-100"
                : "bg-primary-500"
            }`}
          >
            {!form.formState.isValid || ratingValue === null || selectedDifficulty === ""
              ? "세가지 모두 입력해주세요!"
              : "리뷰를 등록합니다"}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewRegisterModal;
