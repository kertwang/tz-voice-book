let storageBucket = "";
if (process.env.storageBucket) {
  storageBucket = process.env.storageBucket.replace("\"", '');
}

export {
  storageBucket,
}