import fs from "fs";
import {semesters} from "./semesters.mjs";

const downloadFile = async (semester, path) => {
  console.log(`attempt to fetch enrollment data for ${semester}`);

const res = await fetch("https://louslist.org/deliverEnrollmentData.php", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Referer": `https://louslist.org/requestEnrollmentData.php?Semester=${semester}`,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `submit=Submit+Data+Request&Semester=${semester}`,
  "method": "POST"
});

  const fileStream = fs.createWriteStream(path);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await new Promise((resolve, reject) => {
      fileStream.write(buffer);
      fileStream.end(resolve);
//      fileStream.on("finish",()=>{console.log(`done downloading ${semester}`); resolve();} );
    });
}

const doit = async ()=>{
  const semIds = Object.keys(semesters);
  for (let i=0; i<semIds.length; i++) {
    console.log(semIds[i]);
try {
    await downloadFile(semIds[i], `${semIds[i]}.zip`)
} catch(e) {
  console.log(`problem`);
  console.log(e);
}
  }
};

doit();
