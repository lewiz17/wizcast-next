import React, { useState } from "react";

const Tabber = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab mt-5">
      <div className="tab-buttons flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={
              index === activeTab
                ? "item-view rounded-lg py-2 px-4 text-white"
                : "py-2 px-4 text-white"
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content mt-5">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabber;
