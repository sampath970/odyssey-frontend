import React, { ReactNode } from "react";
import "./floating-menu.scss";

interface FloatingMenuProps {
  menuTriggerComponent?: ReactNode;
  children?: ReactNode;
  floatDirection?: "left" | "right";
  marginStyle?:any,
  toolTipLeft?:any,
  status?:boolean,
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  menuTriggerComponent,
  children,
  floatDirection,
  marginStyle,
  toolTipLeft,
  status,
}) => {
  const floatCss = floatDirection === "left" ? "--right" : "--left";

  return (
    <div data-testid="floating-menu" className="menu">
      <div data-testid="floating-menu-trigger" className="menu__trigger">
        <div data-testid="floating-menu-anchor" className="menu__anchor">
          {menuTriggerComponent}
          <div
            data-testid="floating-menu-content"
            className={"menu__content menu__content" + floatCss}
            style={{...marginStyle,"--tooltip-left": toolTipLeft,display:status?"none":""}}
           
          >
            <div className="menu__content-wrapper">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
