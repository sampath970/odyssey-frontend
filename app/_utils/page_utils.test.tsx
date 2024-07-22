import { describe, it, expect } from "@jest/globals";
import { sortArrayByUnitId } from "./page_utils";


describe("sortArrayByUnitId", () => {
      it("should sort the array by unit_id in alphanumeric order", () => {
        
        const items =[
            { unit_id: "B2"},
            { unit_id: "A1" },
            { unit_id: "C3" },
            { unit_id: "A10" }
        ];
    
        const sorted = sortArrayByUnitId(items);
    
        expect(sorted).toEqual([      
            { unit_id: "A1" },
            { unit_id: "A10" },
            { unit_id: "B2" },
            { unit_id: "C3" },
        ]);
      });
    
      it("should handle empty array", () => {
        const items: any[] = [];
    
        const sortedItems = sortArrayByUnitId(items);
    
        expect(sortedItems).toEqual([]);
      });

      test("sortArrayByUnitId should handle items with no alphabetic characters", () => {
        const items = [
          { unit_id: "a123" },
          { unit_id: "456" },
          { unit_id: "789" },
        ];
      
        const sortedItems = sortArrayByUnitId(items);
      
        expect(sortedItems).toEqual([
          { unit_id: "456" },
          { unit_id: "789" },
          { unit_id: "a123" },
        ]);
      });
      
      test("sortArrayByUnitId should handle items with no numeric characters", () => {
        const items = [
          { unit_id: "A" },
          { unit_id: "B" },
          { unit_id: "C" },
        ];
      
        const sortedItems = sortArrayByUnitId(items);
      
        expect(sortedItems).toEqual([
          { unit_id: "A" },
          { unit_id: "B" },
          { unit_id: "C" },
        ]);
      });
      
});
