import copy from "copy-to-clipboard";
import React from "react";
import ReactDOM from "react-dom/server";
import * as Providers from "src/app/providers";

// Some cusotm utils for app
export const useUtils = () => {
  const handler = Providers.useCustomHandler;

  // Content copy utils with conetnt and success message
  const contentCopy = (content: string, message?: string) => {
    copy(content);
    handler({
      message: message || "Copied!",
      variant: "success",
    });
  };

  // Use data URL to file convertor
  const useDataURLFile = (dataURL: string, fileName: string) => {
    var byteString = atob(dataURL.split(",")[1]);
    var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var dw = new DataView(ab);
    for (var i = 0; i < byteString.length; i++)
      dw.setUint8(i, byteString.charCodeAt(i));
    const blob = new Blob([ab], { type: mimeString });
    return new File(
      [blob],
      `${fileName}.${blob.type.split("/").slice(-1)[0]}`,
      {
        type: blob.type,
        lastModified: new Date().getTime(),
      }
    );
  };

  // Focusing elemnt
  const toFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      element.scrollIntoView({ block: "center" });
    }
  };

  // To convert file to Base64
  const toBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // To covert text to JSON
  const toCSVJson = (csvFile: string) => {
    const rows: string[][] = [];

    var fieldRegEx = new RegExp(
      '(?:\\s*"((?:""|[^"])*)"\\s*|\\s*((?:""|[^",\\r\\n])*(?:""|[^"\\s,\\r\\n]))?\\s*)(,|[\\r\\n]+|$)',
      "g"
    );
    var row = [];
    var currMatch = null;

    while ((currMatch = fieldRegEx.exec(csvFile))) {
      row.push([currMatch[1], currMatch[2]].join(""));
      if (currMatch[3] != ",") {
        rows.push(row);
        row = [];
      }
      if (currMatch[3].length == 0) break;
    }
    return rows.slice(1).map((cells) =>
      Object.assign(
        {},
        ...cells.map((cell, index) => ({
          [rows[0][index].trim().toLowerCase().replaceAll(" ", "_")]:
            cell.trim(),
        }))
      )
    );
  };

  // to CSV file convertor
  const toCSVFile = (
    titles: string,
    data: Record<string, string | React.ReactNode | number>[]
  ) =>
    `data:text/csv;charset=utf-8,${encodeURI(
      [
        titles,
        data.map((e) => {
          return Object.values(e)
            .map((value) =>
              ReactDOM.renderToString(value as any)
                .replaceAll(",", "")
                .replaceAll(/\<.*?\>/gm, "")
            )
            .toString();
        }),
      ]
        .flat()
        .join("\r\n")
    )}`;

  // Time formater
  const formatTimeString = (time: string) =>
    new Date(time).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Format date to string type
  const formatDateString = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Format date string type to Date type time
  const formatDate = (date: string) => {
    const splitedDate = date.split("/");
    return new Date(+splitedDate[2], +splitedDate[1] - 1, +splitedDate[0]);
  };

  const nestedParser = (name: string, data: any) => {
    let value = "";
    name.split(".").forEach((val) => {
      value = (value || data)[val];
    });
    return value;
  };

  return {
    contentCopy,
    useDataURLFile,
    toFocus,
    toBase64,
    toCSVJson,
    toCSVFile,
    formatDate,
    formatDateString,
    formatTimeString,
    nestedParser,
  };
};
