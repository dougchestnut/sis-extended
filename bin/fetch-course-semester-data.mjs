import fs from "fs";
import {semesters} from "./semesters.mjs";

const downloadFile = async (semester, path) => {
  console.log(`attempt to fetch enrollment data for ${semester}`);

  const res = await fetch("https://louslist.org/deliverData.php", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryq3slEyFgwanU6BFw",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "fpestid=5y6uxG12Gzg1v2OggfrUENIfVzcdqG10UU20mAh_wvf-c1bFTBmadgrBLY0glABdCPwXHw; _gid=GA1.2.99054412.1662659952; _ga=GA1.2.88967452.1662659682; _ga_FX5DG7P5FX=GS1.1.1662672314.3.1.1662676427.0.0.0",
      "Referer": `https://louslist.org/requestData.php?Semester=${semester}&Type=Group&Group=CS`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"Description\"\r\n\r\nYes\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"Extended\"\r\n\r\nYes\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"InstructionMode\"\r\n\r\nYes\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"submit\"\r\n\r\nSubmit Data Request\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"Group\"\r\n\r\nCS\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw\r\nContent-Disposition: form-data; name=\"Semester\"\r\n\r\n${semester}\r\n------WebKitFormBoundaryq3slEyFgwanU6BFw--\r\n`,
    "method": "POST"
  });

  const fileStream = fs.createWriteStream(path);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await new Promise((resolve, reject) => {
      fileStream.write(buffer);
      fileStream.end(resolve);
    });
}

const doit = async ()=>{
  const semIds = Object.keys(semesters);
  for (let i=0; i<semIds.length; i++) {
    console.log(semIds[i]);
try {
    await downloadFile(semIds[i], `${semIds[i]}.csv`)
} catch(e) {
  console.log(`problem`);
  console.log(e);
}
  }
};

doit();
