setTimeout(function(){
    

    console.log("[*] Attempting Java.perform...");


    Java.perform(function() {
    console.log("[*] Java.perform succeeded!");
    console.log("[*] Java available? "+ Java.available);

  try {
    
  var a = Java.use("com.ad2001.frida0x2.MainActivity");
  //package + class name
  a.get_flag(4919);

  } catch (error) {
    console.error("Error : " + error);
  }




    });
    
}, 3000);