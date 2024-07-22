// Function to parse query string parameters
export function getQueryParam(name: string): string | null {
    console.log("6");
    const urlSearchParams = new URLSearchParams(window.location.search);
    console.log("7");
    return urlSearchParams.get(name);
  }

export async function makeHttpRequestJson(request_url: string, request_method: string, my_headers, body = null) {
    var responseData = "";
    if(!request_method) request_method = "GET";
    my_headers = my_headers ? my_headers : new Headers();
    if (!my_headers.has("Content-Type")) {
      my_headers.append("Content-Type", "application/json");
    }
    
    // console.log(request_url, request_method, my_headers);
    try {
      let requestOptions = { method: request_method, headers: my_headers };
      if (body) {
        requestOptions['body'] = body;
      }
      const response = await fetch(request_url, requestOptions); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      responseData = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    return responseData;
}

// Sort an array by alpha numeric field
export function sortArrayByUnitId(items: Array<any>): Array<any> {
  return items.sort((a, b) => {
    const unitIdA = a.unit_id;
    const unitIdB = b.unit_id;
    const regex = /([A-Za-z]+)([0-9]+)/;
    const matchA = unitIdA.match(regex);
    const matchB = unitIdB.match(regex);
    const alphaA = matchA ? matchA[1] : "";
    const alphaB = matchB ? matchB[1] : "";
    const numericA = matchA ? parseInt(matchA[2]) : 0;
    const numericB = matchB ? parseInt(matchB[2]) : 0;

    if (alphaA < alphaB) {
      return -1;
    } else if (alphaA > alphaB) {
      return 1;
    } else {
      if (numericA < numericB) {
        return -1;
      } else if (numericA > numericB) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}
