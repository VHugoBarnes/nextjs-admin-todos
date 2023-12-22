"use client";
import { setCookie } from "cookies-next";
import React, { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[]
};

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const [selected, setSelected] = useState<number>(currentTab < tabOptions.length ? currentTab : 1);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div className={`grid w-full ${"grid-cols-" + tabOptions.length.toString()} space-x-2 rounded-xl bg-gray-200 p-2`}>
      {
        tabOptions.map(tab => (
          <div key={tab}>
            <input type="radio" id={tab.toString()} checked={selected === tab} readOnly className="peer hidden" />
            <label
              onClick={() => onTabSelected(tab)}
              className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {tab}
            </label>
          </div>
        ))
      }
    </div>
  );
};