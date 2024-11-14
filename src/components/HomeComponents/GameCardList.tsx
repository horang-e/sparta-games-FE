import { AiFillCaretRight } from "react-icons/ai";

import GameCard from "./GameCard";
import { Link } from "react-router-dom";

export type GameData = {
  pk: number;
  thumbnail: string;
  title: string;
  star: number;
  maker_name: string;
};

type Props = {
  data: GameData[] | undefined;
  maxNum?: number;
  children?: React.ReactNode;
  simple?: boolean;
  noNavigation?: boolean;
  containerClassName?: string;
};

const GameCardList = ({ data, children, maxNum = 4, simple, noNavigation, containerClassName }: Props) => {
  const slicingData = data?.slice(0, maxNum);

  const baseClassName = "flex flex-col justify-evenly items-center w-full h-[536px] bg-gray-700";

  return (
    <div className={containerClassName ? containerClassName : baseClassName}>
      {children && (
        <p
          className={`flex justify-between items-center mx-auto ${
            !containerClassName ? "w-[1180px]" : "w-full"
          } h-12 text-5xl font-bold`}
        >
          {children}
          {!noNavigation && <AiFillCaretRight className="w-8 h-8 text-white" />}
        </p>
      )}

      <div className={`flex ${!containerClassName ? "justify-evenly w-[1180px] h-[408px]" : "gap-4 mt-2"}`}>
        {slicingData && slicingData.length ? (
          slicingData.map((item) => (
            <Link to={`/game-detail?id=${item.pk}`}>
              <GameCard item={item} simple={simple} />
            </Link>
          ))
        ) : (
          <>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
            <Link to={"/game-detail"}>
              <GameCard />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCardList;
