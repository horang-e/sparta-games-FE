import GamePlay from "./GamePlay";
import GameMedia from "./GameMedia";
import GameDescription from "./GameDescription";

import { TGamePlayData } from "../../../types";

type Props = {
  gamePlayData?: TGamePlayData;
  more: boolean;
  onClickMoreToggleHandler: () => void;
};

const GamePlaySection = ({ gamePlayData }: Props) => {
  const { title, maker_name, gamepath, youtube_url, screenshot, content } = gamePlayData || {};

  return (
    <section className="mt-6">
      <div className="flex gap-5">
        {/* TODO: account_user id와 games_game maker_id 동등 여부 통해 수정하기/ 삭제하기 버튼 표시*/}
        <GamePlay title={title} makerNmae={maker_name} gamePath={gamepath} />
        <GameMedia youtubeUrl={youtube_url} screenShot={screenshot} />
      </div>
      <GameDescription title={title} content={content} screenshot={screenshot} />
    </section>
  );
};

export default GamePlaySection;