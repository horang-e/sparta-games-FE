import { useState } from "react";
import CommunityCard from "./CommunityCard";

const CommunityList = () => {
  const [page, setPage] = useState(1);

  const onClickPageHandler = (arg: number) => {
    setPage(arg);
  };

  const onClickPrevHandler = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const onClickNextHandler = () => {
    if (page === 5) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5 mt-14 mx-auto w-fit">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
      <div className="flex gap-8 my-28 mx-auto w-fit text-title-18 text-white">
        <div onClick={onClickPrevHandler} className="cursor-pointer">
          {"<"}
        </div>
        <div onClick={() => onClickPageHandler(1)} className={`cursor-pointer ${page === 1 && "text-primary-500"}`}>
          1
        </div>
        <div onClick={() => onClickPageHandler(2)} className={`cursor-pointer ${page === 2 && "text-primary-500"}`}>
          2
        </div>
        <div onClick={() => onClickPageHandler(3)} className={`cursor-pointer ${page === 3 && "text-primary-500"}`}>
          3
        </div>
        <div onClick={() => onClickPageHandler(4)} className={`cursor-pointer ${page === 4 && "text-primary-500"}`}>
          4
        </div>
        <div onClick={() => onClickPageHandler(5)} className={`cursor-pointer ${page === 5 && "text-primary-500"}`}>
          5
        </div>
        <div onClick={onClickNextHandler} className="cursor-pointer">
          {">"}
        </div>
      </div>
    </>
  );
};

export default CommunityList;
