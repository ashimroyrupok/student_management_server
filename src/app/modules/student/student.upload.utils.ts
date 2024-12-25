import fs  from 'fs';
import pdf from "pdf-parse";

 export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  let dataBuffer = fs.readFileSync(filePath);
  const text = pdf(dataBuffer).then(function (data) {
    return data.text;
  });
  return text; //;full plane text is here
};

export const regex = /(\d{6})\s*\{\s*((?:\d{5}\(T\)(?:,\s*)?)*)\s*\}/g;
