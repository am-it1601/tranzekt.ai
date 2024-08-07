import React, { FunctionComponent } from 'react';

const HeaderBox: FunctionComponent<HeaderBoxProps> = ({ title, user, type, subtext }) => {
    return (
        <div className="header-box">
            <h1 className="header-box-title">
                {title}
                {type === 'greeting' && <span className="text-bankGradient">&nbsp;{user}</span>}
            </h1>
            <p className="header-box-subtext">{subtext}</p>
        </div>
    );
};

export default HeaderBox;
