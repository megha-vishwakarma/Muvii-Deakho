import "./switchTabs.scss";
import React from "react";


const SwitchTabs = ({ data, onTabChange }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const [left, setLeft] = React.useState(0);

    const activeTabs = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setActiveTab(index);
        }, 200);

        onTabChange(tab, index);
    }
    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => {
                    return (
                        <span
                            key={index}
                            className={`tabItem ${activeTab === index ? "active" : ""} `}
                            onClick={() => activeTabs(tab, index)}
                        >
                            {tab}
                        </span>
                    );
                })}
                <span className="movingBg" style={{left}} />
            </div>
        </div>
    );
};

export default SwitchTabs;
