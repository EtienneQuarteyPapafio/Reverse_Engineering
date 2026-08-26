# UnCrackable-Level1.apk

## Overview

This is a sample CrackMe from OWASP, it is my first attempt at reverse engineering Android samples, and samples in Java overall. I had a bit of help using John Hammond's guide: https://www.youtube.com/watch?v=QwwLSyRzNwo for initial decompilation and log cat debugging, however the sample code was recently updated which meant a lot of the video was not directly transferable.


This is a simple emulator loaded for pixel 6, using the android studio IDE. We see uncrackable1.apk loaded into the app tray.

<img src="/UnCrackable-Level1/img/2.png" width=50% height=50%>

The program prompts the user to enter a string into the text box, and is shown a rejection pop-up when the correct string has not been entered.

<img src="/UnCrackable-Level1/img/4.png" width=50% height=50%>

Using jadx-gui we can decompile the APK file to look at the source code, upon looking closely at sg.vantagepoint.a.a.a we see the program imports various functions using java.security: an InvalidKeyException, NoSuchAlgorithimException, a Ciper, NoSuchPaddingException, and a SecretKeySpec.

The Exception functions are potentially used along with the verification functions of the input, whilst the Ciper and SecretKeySpec would be for the actual key that the program generates, from the code i imagine it would be based off AES encryption due to the specified string.

It creates a class that creates a byte array 'a' with arguments bArr, and bArr2 that are also arrays, the array also throws the previously mentioned exceptions.

In the function, it uses SecretKeySpec to define a function called secretKeySpec with the arguments (bArr, "AES/ECB/PKCS7Padding"). It also creates a Cipher using AES encryption, and initialises it with (2, secretKeySpec). The function returns the stored information in bArr2.

<img src="/UnCrackable-Level1/img/5.1.png" width=100% height=100%>

Under a.b we see it imports a context function and the entire function is a booleen that a.b returns, to me this a little suspicious, I imagine the function could be called to verify something else before a process runs but without proper investigation it is only an unfounded suspicion.

<img src="/UnCrackable-Level1/img/5.2.png" width=100% height=100%>

Under a.c it imports the android build and the java file functions, we also see various functions being created, c.a, c.b, and c.c, these individual functions seem to check for a string, directory, or file, c.a checks for the file "su" under a path name "PATH" and returns true if it exists.

<img src="/UnCrackable-Level1/img/5.3.png" width=100% height=100%>

c.b creates a variable str that equals Build.TAGS, if the string is not null and contains the string "test-keys" it returns the string.

c.c is another Boolean function that checks for the various files or paths, su possible stands for "Super User" and returns if these exist as well as if they do not.

Overall the capability of this APK at the very least is reconnaissance, it is checking for path names, files, and specific strings. 

Under sg.vantagepoint.uncrackable1, we see various imports, a Base64, and a log function. Under the Boolean function 'a' that takes a string as an argument we see a byte array variable created, and a second byte array created and allocated memory with the definition new, and filled with default value of zero. This function then uses exception handling. It uses try{} and catch(Exception e){}. the try statement allows a block of code to be tested for errors during execution and the catch statement defines a block to be executed if an error occurs in the try block.

<img src="/UnCrackable-Level1/img/6.png" width=100% height=100%>

The try statement in this case uses the sg.vantagepoint.a.a.a which is where the cryptography function is defined.

8d127684cbc37c17616d806cf50473cc is stored as an argument for the first array within it, whilst the base64 decoded 5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc= is stored as the second argument. When the exception is caught by the catch function bArrA is changed to bArr, which is 0. If the string input matches bArra it is returned. It may be possible to find the cipher or the secret key at runtime if we hook unto the file at runtime, however it is possible that the application has anti debugging techniques enabled which can prevent us from further analysis.

The MainActivity section of the APK has various imports including AlertDialog, DialogInterface, uncrackable1, and sg.vantagepoint.a.b, and sg.vantagepoint.a.c, (but not a.a where the cipher function is stored).

<img src="/UnCrackable-Level1/img/7.png" width=100% height=100%>

There are three defined classes in this section of code: 'a', onCreate, and verify.'a' contains the string "This is unacceptable. The app is now going to exit.", possibly alluding to an anti-debugging check, and an Override with system.exit occurring once triggered. onCreate is an override that uses sg.vantagepoint.a.c to check for Root access, sg.vantagepoint.a.b to check for a debugger affirming my previous suspicion, then the app triggers function 'a', which closes the app.

The final function will display a success or failure text depending on the entered string, this is where the logic for the key verification dialog is declared.

Using android studio we can use logcat to look up variables and have the code printed in the log file, by copying and pasting some of the code used in the decryption function to bypass the debugging feature.

<img src="/UnCrackable-Level1/img/9.png" width=100% height=100%>

We end up with the string "I want to believe". However this method would not be viable to use with heavily obfuscated APKs, even with the light obfuscation of function names it was enough to confuse me a little. Using Frida would be a possible counteraction for a packed sample as we could dump contents of the file from memory.

## Frida Hooking

# Author

Etienne Quartey-Papafio\
Malware Analyst & Reverse Engineer\
GitHub: https://github.com/EtienneQuarteyPapafio
