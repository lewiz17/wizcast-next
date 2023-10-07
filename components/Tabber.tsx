import React, { useState } from "react";

const Tabber = ({ tabs, page = "" }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={`tab ${page === "index" ? "index mt-10" : "mt-5"}`}>
      <div className="tab-buttons flex gap-2">
        {page !== "index"
          ? tabs.map((tab, index) => (
              <button
                key={index}
                className={
                  index === activeTab
                    ? "item-view rounded-lg py-2 px-4 text-white"
                    : "py-2 px-4 text-white"
                }
                onClick={() => handleTabClick(index)}
                title={`${tab.label.slice(0, 10)}`}
              >
                {tab.label}
              </button>
            ))
          : tabs.map((tab, index) => (
              <button
                key={index}
                className={
                  page === "index" && index === activeTab
                    ? "item-tab py-1 text-lg xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3"
                    : "py-1 text-lg xs:px-[3%] font-bold text-white tracking-tight leading-tight mt-3"
                }
                onClick={() => handleTabClick(index)}
                title={`${tab.label.slice(0, 10)}`}
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
