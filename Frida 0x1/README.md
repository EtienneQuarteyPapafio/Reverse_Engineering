# Frida 0x1.apk

## Overview

This is an online set of labs designed as an introduction to Frida. I opted not to look at clues or solutions but rather create my own reasoning. The following is my methodology in how I solved this challenge.

## Methodology

When working with an unknown file it is important to understand what the program does, the first thing that I usually do is I run the file, it gives important information at what I will be trying to find, and ultimately what I will be trying to exploit. The apk I ran asks the user for an input and verifies if the input is correct or not, already this gives me clues as to what I am looking for when I use JadX to statically analyse it. There will likely be a stored number or code, a way to verify if the number matches what the user enters, and a response based on the results.

<img src="/Frida%200x1/img/1.png" width=50% height=50%>

Secondly, I always statically analyse, this part of reverse engineering gives me clues at to what I would be trying to hook or follow, by looking at the manifest I can get information about the package name that I can use Frida to hook unto, and where things will be run. In this instance the package name is com.ad2001.frida0x1, and MainActivity is the class where I will be calling my script to hook.

<img src="/Frida%200x1/img/2.png" width=50% height=50%>

From looking at MainActivity, we are able to work out exactly how this code operates. When the application process is created the first of the functions created by the class uses the onCreate function to store a random number into the variable int 'i' using the function get_random(). It has a string variable that asks for user input, there is an if-else conditional check afterwards to confirm if the entered string is an integer and responds with "Enter a valid number !!" if it is not.

The second function that is on the app is for generating the random number that was previously mentioned, get_random(), it uses the java.util.Random import in order to generate this and from the code argument it seems that the bound of the number is 100. I confirmed this information from reading the documentation of the function, the number generated will be from 0 to a limit with only one int argument, and with two arguments it would be the an lower and upper limit.

There is another function declared in the app called "check", it checks that if the generated value 'i' multiplied by 2 and added to the value 4 is equal to 'i2' it shows the text "yey you guessed it right", otherwise it asks you to "Try again". I found this interesting, since I imagine to get the correct answer I will have to have a running numerical function: 
```
x = (x*2)+4
```
From my deductions, if I hook the random number and get the number 50 I will have to input 104. 

<img src="/Frida%200x1/img/3.png" width=50% height=50%>


I now will need to create a new javascript in order to hook to the application. I called this script frida1. In this script I created a constant for the application using the aforementioned package name, then appended the class that I want to monitor which in this case is MainActivity. I created another function to get the return of the function get_random(), then it prints the integer. Furthermore, the script will then use the function to obtain the number I should input and print that statement.

<img src="/Frida%200x1/img/4.png" width=50% height=50%>

Using command line within the folder where the script is saved, I made Frida start the application and implement the script.

```
Frida -U -f com.ad2001.frida0x1 -l frida1.js
```
<img src="/Frida%200x1/img/5.png" width=50% height=50%>

Thankfully my script was correct and printed the correct number, and when I entered it the string to verify the correct input appeared.

<img src="/Frida%200x1/img/6.png" width=50% height=50%>

# Author

Etienne Quartey-Papafio\
Malware Analyst & Reverse Engineer\
GitHub: https://github.com/EtienneQuarteyPapafio

