import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { create } from "react-test-renderer";
import TableView from "./table";
describe("Table Component", () => {
  it("renders the Table Component with Fake Data", () => {
    render(
      <TableView
        tableHeader={[{ text: "Test", key: "test", type: "test" }]}
        tableData={[
          {
            test: "test",
          },
        ]}
      />
    );
  });

  it("Verify the snapshot of the Table Component with Fake Data is matched", () => {
    const wrap = create(
      <TableView
        tableHeader={[{ text: "Test", key: "test", type: "test" }]}
        tableData={[
          {
            test: "test",
          },
        ]}
      />
    ).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});
