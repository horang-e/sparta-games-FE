import React from "react";
import log from "../../../assets/Log.svg";
import SpartaSelectableGroup from "../../common/SpartaSelectableGroup";
import { userStore } from "../../../share/store/userStore";
import { convertToConfigObjects, convertToConfigValues } from "../../../util/convertToConfigObjects";
import { updateUserData } from "../../../api/user";
import { GAME_CATEGORY, selectConfig, USER_TECH, USER_TYPE } from "../../../constant/constant";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const Profile = (props: Props) => {
  //* Hooks
  const { userData, setUser } = userStore();

  //* State
  const [nickname, setNickname] = React.useState<string>("");
  const [gameCategory, setGameCategory] = React.useState<selectConfig[]>([]);
  const [userTech, setUserTech] = React.useState<string>("");
  const [userType, setUserType] = React.useState<selectConfig[]>([]);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

  //* Function
  const profileMutation = useMutation({
    mutationFn: ({
      data,
    }: {
      user_pk: number;
      data: {
        nickname: string;
        user_tech: string;
        game_category: string[];
        is_maker: boolean;
      };
    }) => updateUserData(userData?.user_pk || 0, data),
    onSuccess: () => {
      setIsUpdate(false);
      setUser(sessionStorage.getItem("accessToken") as string);
      // TODO: 성공 토스트 메시지 표시
    },
    onError: (error) => {
      console.error(error);
      // TODO: 에러 토스트 메시지 표시
    },
  });

  const onClickUpdateProfile = async () => {
    if (!isUpdate) {
      setIsUpdate(true);
      return;
    }
    if (userData) {
      profileMutation.mutate({
        user_pk: userData.user_pk,
        data: {
          nickname,
          user_tech: userTech,
          game_category: convertToConfigValues(gameCategory),
          is_maker: userType[0].value as boolean,
        },
      });
    }
  };

  //*
  React.useEffect(() => {
    if (userData) {
      const convertedGameCategory = convertToConfigObjects(GAME_CATEGORY, userData.game_category);
      setNickname(userData.nickname);
      setGameCategory(convertedGameCategory);
      setUserTech(userData.user_tech);
    }
  }, [userData]);

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start ">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">프로필 수정</p>
        </div>
        <button
          className={`${isUpdate ? "border-primary-500" : "border-gray-400"} border-2 w-[20%] h-10 rounded-md ${
            isUpdate ? "text-primary-500" : "text-gray-400"
          } font-bold hover:bg-gray-700 transition-colors`}
          onClick={onClickUpdateProfile}
        >
          {profileMutation.isPending ? "처리중" : isUpdate ? "저장하기" : "수정하기"}
        </button>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <label className="text-gray-100">닉네임</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="spartagames"
            className="py-3 px-4 bg-gray-700 border border-solid border-white rounded-md w-[50%] text-white"
            disabled={!isUpdate}
          />
        </div>
        <div className="flex justify-between ">
          <label className="text-gray-100">관심게임분야</label>
          <div className="w-[50%]">
            <SpartaSelectableGroup
              selectableData={GAME_CATEGORY}
              onChangeSelectedData={(selectedData) => setGameCategory(selectedData)}
              initialSelectedData={gameCategory}
              isResetButton
              isMultipleSelect
              disabled={!isUpdate}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-100">관심기술분야</label>
          <select
            value={userTech}
            onChange={(e) => setUserTech(e.target.value)}
            className="py-3 px-4 w-[50%] bg-gray-700 border border-solid border-white rounded-md appearance-none  text-white"
            disabled={!isUpdate}
          >
            <option value="">장르를 선택해주세요</option>
            {USER_TECH.map((tech, idx) => (
              <option key={idx} value={tech.value as string}>
                {tech.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Profile;
