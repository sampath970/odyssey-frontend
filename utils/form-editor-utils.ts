import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function getDay() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  //@ts-ignore
  if (dd < 10) dd = "0" + dd;
  //@ts-ignore
  if (mm < 10) mm = "0" + mm;
  //@ts-ignore
  if (hh < 10) hh = "0" + hh;
  //@ts-ignore
  if (min < 10) min = "0" + min;
  //@ts-ignore
  if (sec < 10) sec = "0" + sec;

  const timezoneOffset = today.getTimezoneOffset();
  const timezoneOffsetFormatted =
    (timezoneOffset > 0 ? "-" : "+") +
    ("00" + Math.abs(Math.floor(timezoneOffset / 60))).slice(-2) +
    ("00" + (timezoneOffset % 60)).slice(-2);

  const formattedToday =
    dd +
    "/" +
    mm +
    "/" +
    yyyy +
    " " +
    hh +
    ":" +
    min +
    ":" +
    sec +
    " " +
    timezoneOffsetFormatted;

  return formattedToday;
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const defaultFieldNames = [
  {
    id: 1,
    label: "Property Manager Signature",
    question_code: "PROPERTY_MANAGER_SIGNATURE",
    field_type: "signature",
  },
  {
    id: 2,
    label: "Tenant Signature",
    question_code: "TENANT_SIGNATURE",
    field_type: "signature",
  },
];
const defaultOfficeOnlyFieldNames = [
  {
    id: 1,
    label: "Free Form Text",
    question_code: "OFFICE_FIELD",
    field_type: "office_only_field",
  },
];

const addImageToForm = async (
  imgSrc,
  newX,
  newY,
  height,
  width,
  pdfDoc,
  pageNum
) => {
  if (pdfDoc) {
    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];
    const pngImage = await pdfDoc.embedPng(imgSrc);
    const pngDims = pngImage.scale(1 * 0.3);
    firstPage.drawImage(pngImage, {
      x: newX,
      y: newY + 5,
      // size: 20 * 0.477,
      width: width,
      height: height,
    });
  }
};
const addCheckBoxToForm = async (
  newX,
  newY,
  height,
  width,
  pdfDoc,
  pageNum
) => {
  console.log(height);
  console.log(width);
  let imgSrc =
    "data:image/png;base64,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AADGPwAIACACAGD8A4AAACIAAMY/AAgAIAIAYPwDgAAAIgAAxj8ACAAgAgAY/8Y/AAgAIAIAGP8AgAAAIgCA8Q8ACAAgAgAY/wAgAAAiAIDxDwACACACABj/ACAAgAgAgPEPAAIAiAAAGP8AIACACABg/AMAAgCIAADGPwAgAIAIAGD8AwACAIgAAMY/AAgAgAgAYPwDgAAAiAAAxj8ACACACABg/AOAAAAigAgAGP8AgAAAIgCA8Q8ACAAgAgAY/wCAAAAiAIDxDwAIACACABj/ACAAACIAgPEPAAIAIAIAGP8AIAAAIgCA8Q8AAgAgAgDGPwAgAAAiAGD8AwACAIgAAMY/ACAAgAgAYPwDAAIAiAAAxj8ACACOAEQAAOMfAAQAQAQAMP4BQAAARADA+AcABABABACMfwBAAABEAMD4BwAEAEAEAIx/AEAAABFABACMfwBAAAARAMD4BwAEABABAIx/ABAAABEAMP4BAAEAEAEA4x8AEAAAEQAw/gEAAQAQAQDjHwAQAAARADD+AQABABABAOMfABAAABEAMP4BAAEARAAA4x8ABABABACMfwBAAABEAMD4BwAEAEAEAIx/AEAAAEQAwPgHAAQAQAQAjH8AQAAARADA+AcABABABACMfwBAAABEADD+AQABABABRAAw/gEAAQAQAQDjHwAQAAARADD+AQABABABAOMfABAAABEAMP4BAAEAEAEA4x8AEAAAEQCMf+MfABAAABEAjH8AAAEAEAHA+AcABAAAEQCMfwBAAABEAMD4BwAEAEAEAIx/AEAAAEQAwPgHAAQAQAQAjH8AQAAARAAw/gEABABABADjHwBAAABEADD+AQABAEAEAOMfABAAAEQAMP4BAAEAEAFEADD+AQABABABAOMfABAAABEAjH8AAAEAEAHA+AcAEAAAEQCMfwAAAQAQAcD4BwAEAAARAIx/AEAAABABwPgHAAQAABEAjH8AQAAAEAHA+AcABABABADjHwBAAABEADD+AQAEAEAEAOMfAEAAAEQAMP4BAAQAQAQA4x8AEAAARAAw/gEAAQBABADjHwAQAABEAIx/AAABAEAEwPgHABAAAEQAjH8AAAEAEAHA+AcAEAAAEQCMfwAAAQAQAcD4BwAEAAARAIx/AEAAABABMP4BAAQAABEA4x8AQAAAEAEw/gEABAAAEQDjHwBAAAAQATD+AQAEAEAEEAEw/gEABABABADjHwAQAABEADD+AQABAEAEwPgHABAAAEQAjH8AAAEAQATA+AcAEAAARACMfwAAAQBABMD4BwAQAABEAIx/AAABAEAEwPgHABAAABEA4x8AQAAAEAEw/gEABAAAEQDjHwBAAAAQATD+AQAEAAARAOMfAEAAABABMP4BAAQAABEA4x8AQAAAOHcEMBiNfwCAsG46AoCiaNv2l/R6XZZllf5y6kSMfwAAAQAgdggQAYYp38Xx5zT+/+ooAAA+zkcAAP5PGpEP0tsDJzGo8X83/b4dOQoAAAEAYNMIcJje7nXjkv7KD2/8Kv1+eYgjAIAAAHDuCJB/ouwbAvrrsFj/5F+kAQA4gx1HAHC63d3dSXp7kV57TqM3POwPAGBDHgII8AndNwT8rSzLn9Nf3kmvW07l2uS7Mf6Yxv/fHQUAwGZ8BADgjNLofFb4SMB1en/+Pu8PAHA+PgIAcA67u7tP0ttjJ3EllsX6lv+5owAAOD93AACcQxqjOQDcLtwNcNnyT/1vG/8AANtzBwDAlnZ3dx8V67sBJk7jwuSwsm/4AwAIAAB9iwB5/B+k18xpbGXVDf9DRwEAIAAA9DkEVF0I8JWBmw//5+n1LI3/leMAABAAAIYSAupi/bGA2mkY/gAAAgDAOELA/cJHAwx/AAABAGAUIaAq1ncE5I8GjPlhgctu+B8a/gAAAgBA5BAw6SLAw/Sajugf/TC9XnqqPwCAAAAwxhiQA8D9LghUAf8R81f55Z/2H/lpPwCAAABArBgwT6/X3ehf+p0FABAAAPjtGFB1IeCbYv0tAn1+ZsDyg9E/95N+AAABAIDzB4F8d8C0CwInv74Oedzn2/qPu/eFn/IDAAgAAFx+FKi6GPBl9+vJBcWBefd+/MFfL419AAABAID+BYKNYoCn8wMAAAAAAARwwxEAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAMB/2bEDGQAAAIBB/tb3+AojAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAEAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAgAAAAAAAFhJAgAEApKo6nvcfVk8AAAAASUVORK5CYII=";
  if (pdfDoc) {
    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];
    const pngImage = await pdfDoc.embedPng(imgSrc);
    const pngDims = pngImage.scale(1 * 0.3);
    firstPage?.drawImage(pngImage, {
      x: newX + 1,
      y: newY + 2,
      // size: 20 * 0.477,
      width: adjustSize(width),
      height: adjustSize(height),
    });
  }
};
const adjustSize = (size) => {
  if (size > 20) {
    return size - 10;
  } else if (size >= 17) {
    return size - 6;
  } else {
    return size;
  }
};
const addAnswersToField = async (text, newX, newY, pdfDoc, pageNum) => {
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  if (pdfDoc && typeof text == "string") {
    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];
    firstPage?.drawText(text, {
      x: newX,
      y: newY + 5,
      size: 20 * 0.477,
      font: timesRomanFont,
    });
  } else {
    console.log("Add answer to field error");
  }
};

const addSignToField = async (text, newX, newY, pdfDoc, pageNum) => {
  if (pdfDoc) {
    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];
    firstPage.drawText(text, {
      x: newX,
      y: newY - 10,
      size: 20 * 0.477,
      color: rgb(0.074, 0.545, 0.262),
    });
  } else {
    console.log("Add answer to field error");
  }
};
function removeFileExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex !== -1 && lastDotIndex > 0) {
    return filename.substring(0, lastDotIndex);
  } else {
    return filename;
  }
}
function generateRandomString() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function findQuestionByCode(questionnaireList, targetCode) {
  for (let i = 0; i < questionnaireList.length; i++) {
    const questions = questionnaireList[i].questions;
    for (let j = 0; j < questions.length; j++) {
      if (questions[j].code === targetCode) {
        return questions[j];
      }
    }
  }
  return null;
}
function setPagesVisited(pageNum, visitedPages) {
  if (!visitedPages.includes(pageNum)) {
    visitedPages.push(pageNum);
  }
  // Optionally, you can sort the array
  visitedPages.sort((a, b) => a - b);
}
function getModalMessage(role) {
  switch (role) {
    case "tenant-page":
      return "";
    case "property-page":
      return "The document process is complete and will be store appropriately.";
  }
}
function getModalBodyMessage(role) {
  switch (role) {
    case "tenant-page":
      return "You have successfully e-signed the document.";
    case "property-page":
      return "You have successfully signed this document.";
  }
}
function getModalTitle(role) {
  switch (role) {
    case "tenant-page":
      return "Thank You!";
    case "property-page":
      return "Confirmed!";
  }
}
function getTopValueForField(questionText) {
  switch (questionText) {
    case "text":
    case "textarea":
    case "number":
    case "date":
    case "file":
    case "signature":
    case "tenant":
    case "property":
    case "currency":
    case "office_only":
    case "":
      return null;
    default:
      return "-12px";
  }
}
function getBackgroundColorForField(questionText) {
  switch (questionText) {
    case "text":
    case "textarea":
    case "number":
    case "date":
    case "file":
    case "signature":
    case "tenant":
    case "property":
    case "currency":
    case "office_only":
    case "":
      return null;
    default:
      return "white";
  }
}
function getBackgroundColorForMapField(items, officeFieldAnswers) {
  if (
    officeFieldAnswers &&
    officeFieldAnswers.length === 0 &&
    items.question_value !== "office_only"
  ) {
    return "#dfeaff";
  } else if (
    items.question_value === "office_only" &&
    officeFieldAnswers.length !== 0 &&
    officeFieldAnswers.some((answer) => answer.id === items.id)
  ) {
    return "rgb(243,243,243)";
  } else {
    return "lightyellow";
  }
}
function getBorderForMapField(items, officeFieldAnswers) {
  if (
    officeFieldAnswers &&
    officeFieldAnswers.length === 0 &&
    items.question_value !== "office_only"
  ) {
    return "2px solid #2f549b";
  } else if (
    items.question_value === "office_only" &&
    officeFieldAnswers.length !== 0 &&
    officeFieldAnswers.some((answer) => answer.id === items.id)
  ) {
    return "1px solid lightgray";
  } else {
    return "1px solid rgb(238, 198, 0)";
  }
}
function getDisplayStatusForField(role, field) {
  switch (role) {
    case "form-mapping":
      return "flex";
    case "property-page":
    case "rental-page":
      if (field.question_value === "office_only") {
        return "flex";
      } else {
        return "none";
      }
    default:
      return "flex";
  }
}
function getEditableStatusForField(role, field) {
  switch (role) {
    case "form-mapping":
      return true;
    case "property-page":
    case "rental-page":
      if (field.question_value === "office_only") {
        return true;
      } else {
        return false;
      }
    default:
      return true;
  }
}

function getPaddingForField(questionText) {
  console.log(questionText);
  switch (questionText) {
    case "text":
    case "textarea":
    case "number":
    case "date":
    case "file":
    case "signature":
    case "tenant":
    case "property":
    case "office_only":
    case "currency":
    case "":
      return null;
    default:
      return "3px";
  }
}
const getFieldValue = (currentQuestion) => {
  switch (currentQuestion) {
    case "tenant":
      return "tenant";
    case "property":
      return "property";
    case "signature":
      return "signature";
    case "office_only_field":
      return "office_only";
    default:
      return "custom_field";
  }
};
function getOfficeFieldsCount(formData, officeFieldAnswers) {
  let totalCount = 0;
  let officeOnlyFieldCount = 0;
  formData?.forEach((form) => {
    form?.fields?.forEach((field) => {
      if (field.question_value === "office_only") {
        officeOnlyFieldCount++;
      }
    });
  });
  formData?.forEach((form) => {
    form?.fields?.forEach((field) => {
      const questionCodeId = field.id;
      officeFieldAnswers.forEach((code) => {
        if (code.id === questionCodeId) {
          totalCount++;
        }
      });
    });
  });

  // Prepare an object to hold all the data
  const result = {
    totalCount: totalCount, // Total count of officeFieldAnswers
    officeOnlyFieldCount: officeOnlyFieldCount, // Count of "office_only" fields
    difference: officeOnlyFieldCount - totalCount, // Difference between "office_only" fields and officeFieldAnswers
  };

  // Return the result object along with the difference
  return result.difference;
}

async function filterFieldsByPageToOneShot(formData, answers, role, pdf) {
  if (
    role === "rental-page" ||
    role === "tenant-page" ||
    role === "property-page"
  ) {
    const pdfDoc = await PDFDocument.load(pdf);
    const totalPages = pdfDoc.getPageCount();
    const allFields = [];
    for (let pageNum = 0; pageNum <= totalPages - 1; pageNum++) {
      const fieldsOnPage = [];
      formData.forEach((form) => {
        form?.fields?.forEach((field) => {
          const position = field.position;
          const absolutePosition = {
            left: position[0].X,
            bottom: position[0].Y,
            width: position[1].X - position[0].X,
            height: position[1].Y - position[2].Y,
          };
          if (
            answers &&
            answers[field?.question_code] &&
            answers[field?.question_code].value
          ) {
            const answerType = answers[field?.question_code]?.data_type;
            // array or boolean - by making this I avoided extra loop to get the perfect answers according to the field_value
            if (
              field.pg_no === pageNum &&
              (answerType === "array" || answerType === "boolean")
            ) {
              const questionValue = field.question_value;
              answers[field?.question_code]?.value?.forEach((answer) => {
                // Answer's value is included in the field's question value or not
                if (questionValue?.includes(answer?.value)) {
                  fieldsOnPage.push({
                    answer: answer.value,
                    position: absolutePosition,
                    id: field.id,
                    type: answerType,
                  });
                }
              });
            } else {
              const answer = answers[field.question_code]?.value[0]?.value;
              // rest of the fields => same old procedure
              if (field.pg_no === pageNum) {
                fieldsOnPage.push({
                  answer: answer,
                  position: absolutePosition,
                  id: field.id,
                  type: answerType,
                });
              }
            }
          }
        });
      });
      allFields.push(fieldsOnPage);
    }
    return allFields;
  }
}

export {
  addAnswersToField,
  addCheckBoxToForm,
  addImageToForm,
  addSignToField,
  defaultFieldNames,
  defaultOfficeOnlyFieldNames,
  downloadURI,
  findQuestionByCode,
  generateRandomString,
  getDay,
  getFieldValue,
  getModalMessage,
  getTopValueForField,
  removeFileExtension,
  getBackgroundColorForField,
  getDisplayStatusForField,
  getEditableStatusForField,
  getPaddingForField,
  getModalTitle,
  getModalBodyMessage,
  getOfficeFieldsCount,
  setPagesVisited,
  filterFieldsByPageToOneShot,
  getBackgroundColorForMapField,
  getBorderForMapField
};
