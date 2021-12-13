# Metal Order Calculator

This tool is used to automate calculations before purchasing steel. It's being made for use specifically for DNV. I'm going to build a protoype first to get a basic design, basic functionality and then test a method of distribution. I'll make a new official repo when I'm finished. (Make sure to also look up github licensing to select a proper license).

## Planning

Let's look at a basic game plan for this:

1. Understanding the problem
2. Basic function design
3. UI decisions
4. Distribution
5. Minimum Viable Product
6. Potential Future Features

### Understanding the problem

This process is meant to calculate how many pieces of varying sizes can be cut from a larger piece of steel of varied size as well.

_INSERT SCREENSHOT HERE_

DNV purchases long pieces of steel commonly referred to as _"bars"_ or _"lengths."_ For the sake of clarity, I'm going refer to these pieces as "bars". These bars are are already made into certain shapes and sizes and can be purchased in different lengths (see why I'm using _"bars"_?). 

The bars are to cut into smaller pieces and will be referred to as _"cuts"_ or _"pieces"_. Depending on the job, DNV may order a bar different lengths to get the most out of their purchases. The length of cuts needed and quantity of said cuts are listed. They use a system to calculate how many bars to purchase and how many cuts/pieces they get out of each bar.

The _"kere"_, the space between each cut, is also noted and added into the calculations.

To start, it's probably easiest to use a predetermined set of values, make the calculations work and set the functions to work with any set of variables. By the end, the program should be able to take any set of sizes and calculate if they can cut enough for a job.

I'll use the lengths in the provided sample chart in order to calculate.

### Basic system design

For this project, I'm going to attempt to use as much TypeScript as possible to make use of type checks. There will be lots of data being passed around so it should help to prevent and locate bugs.

I should also consider using Big Decimal to get more precise results since we're calculating out to three decimals.

I'll use the basic steps I would use to construct the sample chart and turn each step into its own function. After getting a basic version I'll see if I can refactor the code. What's important right now is function, not performance. I'll do my best to construct each function to take any values so that the program can accept any bar length, bar quantity, cut length, cut quantity and kere.


#### System steps:

1. Get input - cut lengths and cut quantities
2. Get input - bar length and bar quantities
3. Start with longest cuts first, subtract cut from bar until result is below zero (include kere with each cut)
4. If remaining bar length has enough leftover, use the next biggest cut until the bar is too small
5. Repeat process until all cuts have been accounted for.
6. Add up leftover scrap for each piece.
7. Display results to user. Emphasize # of bars, # of cuts for each cut length and scrap.
8. Emphasize bar length and total # of bars needed for user.
9. Offer user to fix any input.
10. Offer user ability to copy, save (or print) results.

### UI Decisions

To start, the UI should stay as basic as possible.

After getting all necessary input, the program should display a chart that looks just like the one on paper, at least for now. After confirming the results look correct, it should show a screen that outputs the chart data in a clear and coherent way that can be copied, saved and perhaps printed so that the results can be referenced later on if needed.

There's probably a more coherent way of viewing the results and, perhaps, as I work on this I'll get a better idea of how to present the results.

### Distribution

I'll use the web to distribute the code as a service. The site will be made into an offline website so that after the site has been visited on a new computer, the necessary code can be saved to the local system and run without connection to the website.

This part will need a some testing and research because I'm not sure how to do this or how it affects future updates to the service.

### Minimum Viable Product

Minimum product should look like a basic, clean page that:

- makes sure you save the necessary code to the user's device/browser.
- gets all bar, cut and kere info.
- displays input and a chart of results.
- can clear the results if input is incorrect.
- confirms results and provides a way to copy, save (or print) results for reference.

### Potential Future Features

_IGNORE THIS UNTIL BASICS ARE DONE_

- The user saves a common "order", perhaps also saving that order under a "client" and can load previous settings into the program having its results recalculated.
- It could be useful to take _"bar price"_ as an input and display a total price at the end. Maybe....

