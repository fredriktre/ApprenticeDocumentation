
#this is a comment

def greeting():
    #this is a variable
    name = input("What is your name?: ")
    
    #here I use the variable in a print
    print("Hi " + name)

    #here I print the name variable's type
    print(type(name))

    #dette er en if, trenger ikke å wrappe if-en i paranteser
    if name == "Ben" or name == "ben":
        print("You're not welcome here Evil Ben!!")

    #Dette er for en else if
    elif name == "Fred" or name == "fred":
        print("Hi boss!")
    else:
        menu = ["cappucino", "latte", "mocha"]

        #Adding coffee to menu
        menu.append("coffee")

        #Adding list to list
        menu.extend(["machiato", "ice-latte"])

        #this also work
        # menu = menu + ["machiato", "ice-latte"] 

        # menu.clear() to, well, clear

        #this is a tuple, which can be "unpacked"
        # networkchuck = "Chuck", 33, "Coffee"
        # (name, age, drink) = networkchuck
        
        #removing ice-latte from the menu
        menu.remove("ice-latte")

        #menu.pop(0) to pop off spesific indexes.

        menu_length = menu.count()

        # print("We have:")
        i = 0

        #while løkke
        # while i < menu_length:
        #     print(menu[i]) 
        #     i = i + 1

        coffeetype = input("What kinda coffee do you want? ")
        coffees = input("How many coffees do you want?: ")   
        price = 0
        if coffeetype == "coffee":
            price = 8
        else:
            price = 12

        #here I change the type of coffees from str to int to use it in a math equation
        total = price * int(coffees)

        #here I change the type of total from int to str so I can concatonate it with the rest of the string.
        print("price for " + coffees + " coffees costs: " + str(total) + "$")

#this is a function
def main():
    print("beep boop!")
    greeting()

main()