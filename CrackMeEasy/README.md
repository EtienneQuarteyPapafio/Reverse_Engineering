r8 loads data from rsp+58h+Size, i assume buffer to enter the password.

later on compares r8 to cs:qword_1400050C8 which i assume is the password.

cmp subracts operand 2 from 1, and sets the zero flag if they are the same. if it is not zero a jump occurs sending you to loc_140001362 which tells you the password is wrong.

If it is zero it continues and r8 is tested against itself, if it is zero it continues to loc_140001369 which is the success pop up. otherwise it tests eax against itself and jumps if it is not zero to show a failure text.

we can patch the jumps.

if we change the first jump to jz, the second to jnz we are able to enter anything and it will let us continue.

By enabling opcode view we can directly modify using the corresponding opcode in the hex view editior. in this instance we are modifying the 75 to 74. To save these edits we go to Edit patch program apply patches to the file directly

