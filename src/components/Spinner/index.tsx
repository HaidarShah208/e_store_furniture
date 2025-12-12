 
import { SpinnerProps } from "@/types/types";
import type { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
const override: CSSProperties = {
  margin: "auto 0",
};

const index = (props: SpinnerProps) => {
  const {color, size} = props;
  return (
    <ClipLoader
      color={color || '#fff'}
      loading={true}
      cssOverride={override}
      size={size || 16}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}

export default index