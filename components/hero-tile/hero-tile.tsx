import React from 'react';
import "./hero-tile.scss";

const HeroTile: React.FC = () => {
    return (
        <>
            <div className="hero-tile">
                <div className="hero-tile__item hero-tile__item-one">
                    <label className="hero-tile__header">We Make Process Simple</label>
                    <p className="hero-tile__info">
                        Try the Free Echo Scan Solution Today
                    </p>
                </div>
                <div className="hero-tile__item hero-tile__item-two">
                    <div className="hero-tile__item-list">
                        <img className="hero-tile__item-image" src="../assets/images/scan.png" alt="" />
                        <label className="hero-tile__item-header">Scan</label>
                        <p className="hero-tile__item-list-item-one hero-tile__item-list-item-one-first-paragraph">
                            Easily generate an audit link for relevant files
                        </p>
                        <p className="hero-tile__item-list-item-one hero-tile__item-list-item-one-second-paragraph">
                            Accessible 24/7
                        </p>
                    </div>
                </div>
                <div className="hero-tile__item hero-tile__item-three">
                    <div className="hero-tile__item-list">
                        <img className="hero-tile__item-image" src="../assets/images/organize.png" alt="" />
                        <label className="hero-tile__item-header">Organize</label>
                        <p className="hero-tile__item__list-item-two">
                            Secure &amp; Searchable
                        </p>
                        <p className="hero-tile__item__list-item-two">AUDIT Ready</p>
                    </div>
                </div>
                <div className="hero-tile__item hero-tile__item-four">
                    <div className="hero-tile__item-list">
                        <img
                            className="hero-tile__item-image"
                            src="../assets/images/store.png"
                            alt=""
                        />
                        <label className="hero-tile__item-header">Store</label>
                        <p className="hero-tile__item__list-item-three">
                            Free and unlimited file storage
                        </p>
                        <p className="hero-tile__item__list-item-three">
                            Securely stored on Azure by Microsoft
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroTile;
