import React from "react";
import { render, screen } from '@testing-library/react';
import HeroTile from "./hero-tile";
import { create } from "react-test-renderer";

describe("render Hero tile inside main page", () => {
  it("Verify the snapshot of Hero tile is matched", () => {
    const wrap = create(<HeroTile />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});