## Difficulties

Mostly understanding, then gets easy. The sorting (specially for numbers) could catch you.


## Exercise: Double Size

Complete the doubleSize function in your editor. It has 2 parameters:
1. An array ofn long integers, a, where the value of each element a,- describes the long integer at index i (where 0 s i < n).
2. A long integer, b, denoting the base number.

Your function must iterate through the elements in a. If the value at some a,- is equal to the current value of b, then you must double the value of b. After iterating
through the entire array, it must return a long integer denoting the maximum possible ﬁnal value of b. You may need to reorder the array's elements to maximize the
value of b.

#### Input Format

The locked stub code in your editor reads the following input from stdin and passes it to your function:
The first line contains an integer, n, denoting the size of array a.

Each line is often subsequent lines (where 0 s i < n) contains a long integer describing array element a,-.
The last line contains a long integer, b.

#### Output Format
Your function must return a long integer denoting the maximum possible ﬁnal value of b. This is printed to stdout by the locked stub code in your editor.

#### Sample Input 1

The following arguments are passed to your function:
a ={1, 2, 3, 1, 2}

b = 1

#### Sample Output 1

2

