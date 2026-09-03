# Frida 0x2.apk

## Overview

This is an online set of labs designed as an introduction to Frida. I opted not to look at clues or solutions but rather create my own reasoning. The following is my methodology in how I solved this challenge.

## Methodology

When working with an unknown file it is important to understand what the program does, the first thing that I usually do is I run the file, it gives important information at what I will be trying to find, and ultimately what I will be trying to exploit. The APK I ran asks the user "Hook Me", so I set out to do exactly that.

<img src="/Frida%200x2/img/2.png" width=50% height=50%>

By opening the APK in JadX and looking at the manifest I can get information about the package that I can use Frida to hook unto, and also where things will be run. In this instance the package name is com.ad2001.frida0x2, and MainActivity is the class where I will be calling my script to hook.

<img src="/Frida%200x2/img/3.png" width=50% height=50%>

From looking at MainActivity, we are able to work out exactly how this code operates. When the application process is created the first of the functions created by the class uses the onCreate function to set a variable t1 to (TextView). Looking at the imports I can assume that is where the text of "Hook Me!" is so I need to find a way to modify it.

The second function that is on the app is 'get_flag(int a)'. It has a conditional that operates if the argument for the function is 4919, it will assign a de-crypted text to the variable t1. As I cannot see any other variables or functions that assign 4919 to int a, I will have to use a Frida script to do this.

<img src="/Frida%200x2/img/4.png" width=50% height=50%>

I called this script frida2. In this script I created a variable for the application using the aforementioned package name, then appended the class that I want to modify which in this case is MainActivity. I created another function to modify the static function, which pushes the integer 4919.

<img src="/Frida%200x2/img/5.png" width=50% height=50%>

However when using Frida to start the script I was getting an error which forced the process to terminate immediately. An online form suggested using a 'setTimeout()' to let the application load instead of immediately trying to implement a script. In the script I created several strings that prints at stages of the script runtime in order to catch what point it runs to. Thankfully the script worked and showed the flag of the crackme.

<img src="/Frida%200x2/img/6.png" width=50% height=50%>


# Author

Etienne Quartey-Papafio\
Malware Analyst & Reverse Engineer\
GitHub: https://github.com/EtienneQuarteyPapafio
