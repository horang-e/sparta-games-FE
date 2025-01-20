import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = {
  dataTotalCount: number | undefined;
  countPerPage: number;
  onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
};

const SpartaPagination = ({ dataTotalCount, countPerPage, onChangePage }: Props) => {
  const TOTAL_PAGE = dataTotalCount ? Math.ceil(dataTotalCount / countPerPage) : 1;

  return (
    <div className="flex justify-center">
      <Pagination
        count={TOTAL_PAGE}
        onChange={onChangePage}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            marginX: "6px",
            color: "#BFBFBF",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#05F500",
            color: "#000",
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "#05F500",
            color: "#000",
          },
          "& .MuiPaginationItem-previousNext:hover": {
            color: "#05F500",
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: () => (
                <div className="flex items-center gap-2">
                  <ArrowBackIcon sx={{ width: "18px" }} />
                  <span className="text-base font-Pretendard">Previous</span>
                </div>
              ),
              next: () => (
                <div className="flex items-center gap-2">
                  <span className="text-base font-Pretendard">Next</span>
                  <ArrowForwardIcon sx={{ width: "18px" }} />
                </div>
              ),
            }}
            slotProps={{
              previous: { sx: { color: "#BFBFBF" } },
              next: { sx: { color: "#BFBFBF" } },
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default SpartaPagination;