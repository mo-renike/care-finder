import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <TailSpin
        height="20"
        width="20"
        color="#78AA91"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
