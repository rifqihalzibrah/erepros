export const getAccessKey = async (): Promise<string> => {
  const apiKey = "0AOzrZaGBQPgQSsFNviMACmtjVtKkut"; // Keep hardcoded API key
  const url = "https://connect.propertyware.com/auth/apikey";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data["access-key"];
  } catch (error) {
    console.error("Error fetching access key:", error);
    throw error;
  }
};

export const fetchData = async (accessKey: string) => {
  const url =
    "https://connect.propertyware.com/api/marketing/listings?website_id=564592641&widget_id=3100&include_for_rent=true&include_for_sale=true";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.filter((property: { property_type: string }) =>
      ["apartment", "house", "other"].includes(
        property.property_type.toLowerCase()
      )
    );
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
};

// services/propertywareAPI.ts
export const fetchPropertyById = async (id: string) => {
  const accessKey = await getAccessKey();
  const url = `https://connect.propertyware.com/api/marketing/listings/${id}`; // Verify this endpoint

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch property data");
    }

    const propertyData = await response.json();
    propertyData.images = propertyData.images || [];
    return propertyData;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
};
