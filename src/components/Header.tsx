import useModalToggle from "../hook/useModalToggle";

import balloon from "../assets/headerImage/balloon.svg";
import speaker from "../assets/headerImage/speaker.svg";
import Category from "./headerComponents/Category";

const Header = () => {
  const { modalToggle, onClickModalToggleHandler } = useModalToggle();

  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-full h-20 bg-gray-800 font-DungGeunMo text-white">
      <section className="flex items-center gap-4">
        <img src="" alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <h1 className="text-heading-32 text-primary-500">Sparta Games</h1>
      </section>
      <section className="flex items-center gap-10 text-heading-24 font-normal">
        <img src={balloon} alt="검색 아이콘" />
        <img src={speaker} alt="알림 아이콘" />
        <div className="relative">
          <p onClick={onClickModalToggleHandler}>카테고리</p>
          {modalToggle && <Category onClickModalToggleHandler={onClickModalToggleHandler} />}
        </div>
        <p>게임 업로드</p>
        <p>커뮤니티</p>
        <p>로그인/회원가입</p>
      </section>
    </header>
  );
};

export default Header;
