import PropertyAdapter from "../services/adapters/properties-adapter";
import TenantAdapter from "../services/adapters/tenants-adapter";

const fetchRentalByTenant = async (_tenantID) => {
    try {
      //let shouldShowIntro = Cookies.get("intro_seen");
      // if (!shouldShowIntro) {
      //   setIntro(true);
      // }
      // We don't have a user ID, so we can't fetch any data.
      if (!_tenantID) {
        return null;
      }
      const data = await TenantAdapter.getRentalByTenantId(_tenantID);
      const uniquePropertyIds = new Set();
      const propertyPromises = data.map(async (item) => {
        const propertyId = item.property_id;
        try {
          if (!uniquePropertyIds.has(propertyId)) {
            uniquePropertyIds.add(propertyId);
            const property = await PropertyAdapter.getPropertyByID(propertyId);
            return property;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching property:", error);
          return null;
        }
      });
      const properties = await Promise.all(
        propertyPromises
          .filter((property) => property !== null)
          .flatMap((propertyArray) => propertyArray)
      );
      console.log(properties);
      const uniqueProperties = properties
        ?.filter((property) => property !== null)
        .flatMap((propertyArray) => propertyArray);
      if (data && uniqueProperties) {
        const resultArray = data.reduce((result, item1) => {
          const propertyMatch = uniqueProperties.find((property) => {
            const matchingUnit =
              property?.units &&
              property.units.find((unit) => unit.id === item1.unit_id);
            return matchingUnit;
          });
          if (propertyMatch) {
            const matchingUnit = propertyMatch.units.find(
              (unit) => unit.id === item1.unit_id
            );
            const resultItem = {
              ...matchingUnit,
              rental_id: item1.id,
              status: item1.certification_status || "",
              property: propertyMatch,
            };
            result.push(resultItem);
          }
          // countForms(data);
          return result;
        }, []);
        return resultArray;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  export  {fetchRentalByTenant};