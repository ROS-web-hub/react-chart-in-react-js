import React from "react";
import AddBox from "./icons/AddBox";
import RemoveBox from "./icons/RemoveBox";

const PlusMinus = ({ active = false }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: 0,
      }}
    >
      {active ? (
        <RemoveBox height={16} width={16} fill="#555" />
      ) : (
        <AddBox height={16} width={16} fill="#555" />
      )}
    </div>
  );
};
export default PlusMinus;
