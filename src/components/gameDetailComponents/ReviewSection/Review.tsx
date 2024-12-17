import ReviewComents from "./ReviewComents";
import ReviewForm from "./ReviewForm";

const Review = ({ gameDetailId }: { gameDetailId: number }) => {
  return (
    <section className="my-12">
      <p className="font-DungGeunMo text-[32px] text-white">Review</p>
      <ReviewForm gameDetailId={gameDetailId} />
      <ReviewComents />
    </section>
  );
};

export default Review;