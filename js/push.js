var webPush = require('web-push'); 
const vapidKeys = {
   "publicKey": "BGJu5ePGtZVs3zM3uf3nGjIKkuLswcAbbETpoKHE_RosH3Hyg4lW9J83Y60xTXsprvb-jWVxqefT_3wxgBq85H8",
   "privateKey": "op55YTq8vJe2pYUs12sPchMcpXHGgefMJTs1GF3JoiU"
}; 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ft10cw00Otw:APA91bFHmWBUENu-vb-_8h76Eul-PlWwbKmEQ-e6q4IEW-STAbB1uFMOWTlBX5CEUKh5HsA-nsGsH744pJhrgyE9HUuDynJ2jDs29d1Xmzvk0uyniVOgtLQ8igQzG-7KNZaJYSk1Ic8F",
   "keys": {
       "p256dh": "BH50Flr3YcxQHMnGfYlnGds7LK5V16lxKyk2CKRzb9BcsbW+txFd/ROiqHr7QjFiYBpBZ53WTIGAdPaouzV2Mj0=",
       "auth": "sNyveEu2YNjPzoEZLesrnQ=="
   }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'; 
var options = {
   gcmAPIKey: '324794527752',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);