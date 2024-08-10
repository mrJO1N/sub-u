import React from "react";

const AvatarIcon = (props: { height: number; width: number }) => {
  return (
    <>
      <img
        className="avatar-icon"
        src="https://cdn.onlinewebfonts.com/svg/img_568656.png"
        alt="ava"
        height={props.height}
        width={props.width}
      />
    </>
  );
};

export default AvatarIcon;
