# Crack Me Easy

## Overview

This is a sample Crack Me from Crack Me Ones, this is my introduction to Reverse Engineering using IDA and x64dbg in order to patch software so I can eventually bypass anti-debugging and packed executables. I opted not to use the psuedo C code when analysing the software to better train me in reading x86 assembly instructions.


This crack me executable opens with a cmd window that prompts the user to enter a password. When entered incorrectly it prompts the user to try again. Initial assumptions can be made about this file: it will have a buffer to store the entered password, a hard-coded password in which it will compare the users input to, a conditional in order to verify, and finally a success or failure message depending on the result.

<img src="/CrackMeEasy/img/1.png" width=50% height=50%>

Opening the file in IDA graph view shows the overall architecture of the script, as well as jump conditions clearly. The script prints a welcome line, asks for the user to enter the password, then loads a block into rdx using the load effective address instruction. The value of which, "EasyPassword" is visible next to the instruction due to a lack of encryption or obfuscation, which is now either stored or pointed to by rdx. The script then creates a buffer for the variable r8 which the user will input text into. The script then compares r8 to cs:qword_1400050C8, which subtracts the values from each other without changing the operands, sets the zero flag, and jumps to a failure branch if it is not zero, this means it is expecting the same value in both.

If the comparison triggers the zero flag it then moves unto a branch that tests r8 against itself. The test instruction does not change the destination operand but will set the zero flag to 1 if both bits are different and 0 otherwise. Afterwards, the script calls a memory comparison which compares two blocks of memory byte byte byte and returns 0 possibly to eax if they match. A final test instruction of eax against itself will return 0 before another jump conditional appears sending the user to a failure branch if the zero flag is not set.

<img src="/CrackMeEasy/img/2.png" width=50% height=50%>

If we change the first jump to trigger if the zero flag is set, and the second if the zero flag is not set. It allows us to enter anything and the script will continue. We will not need to modify the third jump since we will already be at the success branch. 

By enabling opcode view we can directly modify using the corresponding opcode in the hex view editior. in this instance we are modifying the 75 to 74 and vice versa to change the jump conditions. To save these edits we apply patches to the file directly.

<img src="/CrackMeEasy/img/3.png" width=50% height=50%>

We now see the changed jumps.

<img src="/CrackMeEasy/img/4.png" width=50% height=50%>

Now upon entering something that is clearly not the password we receive the success branch.

<img src="/CrackMeEasy/img/5.png" width=50% height=50%>

However, the correct password now shows the failure branch.

<img src="/CrackMeEasy/img/6.png" width=50% height=50%>

# Author

Etienne Quartey-Papafio\
Malware Analyst & Reverse Engineer\
GitHub: https://github.com/EtienneQuarteyPapafio

