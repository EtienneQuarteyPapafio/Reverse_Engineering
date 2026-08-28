Java.perform(() => {
  
  const Activity = Java.use('com.ad2001.frida0x1.MainActivity'); //Uses java.use to find and get a handle to specified class

//package + class name

  Activity.get_random.implementation = function () { //the method defined in APK file

    send('Whats happening inside the number gen: '); //Print statement

    var retVal = this.get_random(); //defining variable


    send('Value of number is: ' + retVal); //Print statement

    send(' Enter: ' + ((retVal*2)+ 4)); //Print statement

    return retVal;


  };


});