 
import type { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import type { SpinnerProps } from "../../lib/type/componentTypes";
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