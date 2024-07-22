import React from "react";
import classNames from "classnames";
import "./card.scss";
import Pencil from "../../public/assets/icons/penciledit.svg";
import Label, { LabelType, LabelVariant } from "../../components/label/label";
import { AccessPermission, validate } from "../../app/_auth/permissions";

interface CardProps {
  cardTitle: string;
  cardUnit: string | number;
  cardType: string;
  cardAddress: string;
  cardImgSrc?: string;
  cardDefault?: React.ReactNode;
  cardClick?: () => void;
  editClick?: () => void;
  userInfo?:any
}

const Card: React.FC<CardProps> = ({
  cardTitle,
  cardUnit,
  cardType,
  cardAddress,
  cardImgSrc,
  cardClick,
  cardDefault,
  editClick,
  userInfo
}: CardProps) => {
  const cardClass = classNames({
    property: cardType === "property",
  });

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    try {
      if (editClick) {
        editClick();
        event.stopPropagation();
      }
    } catch (ex) {
      console.error("Error at handleEditClick");
    }
  };

  return (
    <div className="card" onClick={cardClick}>
      <div>
        {cardImgSrc === "" && cardDefault && (
          <div className="card__default" data-testid="card-default">
            {cardDefault}
          </div>
        )}
        {cardImgSrc && (
          <img className="card__image" src={cardImgSrc} alt="Card" />
        )}
      </div>
      <div>
        <div className="card__title">
          <Label
            dataTestId="card-title"
            type={LabelType.Header}
            text={cardTitle}
            variant={LabelVariant.L4}
          />
          {validate([AccessPermission.Write], userInfo ? userInfo.permissions : { permissions: 0 }) == true && ( 
          <div
            className="card__edit-icon"
            onClick={handleEditClick}
            data-testid="edit-icon"
          >
            <Pencil className="pencil-icon" />
          </div>
          )}
        </div>
        <div className="card__address">
          <Label
            dataTestId="card-address"
            type={LabelType.SubHeader}
            text={cardAddress}
            variant={LabelVariant.L3}
          />
        </div>
        <div className="card__details">
          <div className="card__units">
            <div>
              <span >
                <Label
                  dataTestId="card-unit"
                  type={LabelType.SubHeader}
                  text={cardUnit}
                  variant={LabelVariant.L3}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
