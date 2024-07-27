import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CircularProgress
        sx={{
          height: "200px",
          width: "200px",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default Loader;
