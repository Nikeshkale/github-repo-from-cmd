
function cat (){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const sheetValue = sheet.getDataRange().getValues();
  let url,badge,email,cc,subject,replyTo,body,userName;
  var badgesArray =[];
  for (let i=1 ;  i<sheetValue.length ; i++){
    const row = sheetValue[i];
     url = row[7];
    badge = row [10];
    email = row[4];
    cc = row[2];
    subject = row[1];
    replyTo = row[3];
    body = row[5];

  //var url = 'https://www.cloudskillsboost.google/public_profiles/7830f474-a2ab-4e14-89a5-ffc4e949d0a1';
  if (url) {
  var response = UrlFetchApp.fetch(url);
  var htmlResponse = response.getContentText();
  const $ = Cheerio.load(htmlResponse);
   userName = $('h1.ql-display-small' ).text().trim(); // checking the public profile url is correct or not
 // var profileBadges = $('span.ql-title-medium.l-mts').text();
  var profileBadges = $('span.ql-title-medium.l-mts').map(function() {
    return $(this).text();
  }).get(); // now we splits the all the badges separately
  //console.log(profileBadges);
  // for (let badge=0; badge<profileBadges.length;badge++){
  //   sheet.getRange(badge+2,11).setValue(profileBadges[badge]); // pushed the badges into cell separately
  // }
  for (let i=1; i<sheetValue.length;i++){
  const row = sheetValue[i];
   badge= row[10];
   badgesArray.push(badge);
  }
  
//Logger.log(badgesArray);

  let count=0;
  for (let i=0;i<profileBadges.length;i++){
    for (let j=0;j<badgesArray.length;j++){
      if(profileBadges[i]== badgesArray[j]){
           count++;
           break;
      }
    }
    }
    console.log("User"+ userName + "Final count  "+ count );
    const sendEmailtoUser = sendEmail(email,subject,userName,cc);
    sheet.getRange(i+1,7,1,1).setValue(sendEmailtoUser);
  }
  }   
}



function sendEmail (email,subject,userName,cc){
  try{
   // const emailBody = "Hello" + userName + ",\n\nThis is a test mail.\n\nThanks & Regards,\nQuicklab";
    const emailBody = "Hello " + userName + ",\nThis is a test mail.\n\nThanks & Regards,\nQuicklab";

   // MailApp.sendEmail(email,subject,body,{cc: cc,replyTo: replyTo});
      MailApp.sendEmail(email,subject,emailBody,{cc:cc})

    const date = Utilities.formatDate(new Date(),"IST" ,"MM/dd/yyyy h:mm a")
    return 'Email Sent - '  + date;
  }
  catch (error) {
    return error.message;
  }
}

