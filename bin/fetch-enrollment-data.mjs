import fs from "fs";

let semesters = { 
1228:"Fall 2022",
1226:"Summer 2022",
1222:"Spring 2022",
1221:"January 2022",
1218:"Fall 2021",
1216:"Summer 2021",
1212:"Spring 2021",
1211:"January 2021",
1208:"Fall 2020",
1206:"Summer 2020",
1202:"Spring 2020",
1201:"January 2020",
1198:"Fall 2019",
1196:"Summer 2019",
1192:"Spring 2019",
1191:"January 2019",
1188:"Fall 2018",
1186:"Summer 2018",
1182:"Spring 2018",
1181:"January 2018",
1178:"Fall 2017",
1176:"Summer 2017",
1172:"Spring 2017",
1171:"January 2017",
1168:"Fall 2016",
1166:"Summer 2016",
1162:"Spring 2016",
1161:"January 2016",
1158:"Fall 2015",
1156:"Summer 2015",
1152:"Spring 2015",
1151:"January 2015",
1148:"Fall 2014",
1146:"Summer 2014",
1142:"Spring 2014",
1141:"January 2014",
1138:"Fall 2013",
1136:"Summer 2013",
1132:"Spring 2013",
1131:"January 2013",
1128:"Fall 2012",
1126:"Summer 2012",
1122:"Spring 2012",
1121:"January 2012",
1118:"Fall 2011",
1116:"Summer 2011",
1112:"Spring 2011",
1111:"January 2011",
1108:"Fall 2010",
1106:"Summer 2010",
1102:"Spring 2010",
1101:"January 2010",
1098:"Fall 2009",
1096:"Summer 2009",
1092:"Spring 2009",
1088:"Fall 2008",
1086:"Summer 2008",
1082:"Spring 2008",
1078:"Fall 2007",
1076:"Summer 2007",
1072:"Spring 2007",
1068:"Fall 2006"}

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
    "cookie": "fpestid=5y6uxG12Gzg1v2OggfrUENIfVzcdqG10UU20mAh_wvf-c1bFTBmadgrBLY0glABdCPwXHw; _gid=GA1.2.99054412.1662659952; _ga=GA1.1.88967452.1662659682; _ga_FX5DG7P5FX=GS1.1.1662672314.3.1.1662674924.0.0.0",
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
