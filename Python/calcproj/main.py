
def main ():
    print("Dette er en kalkulator samling")
    print("Vi har")

    calculators = ["Pluss", "Minus", "Omkrets og Areal"]
    iteration = 0

    for calculator in calculators:
        print(calculator, iteration)
        iteration += 1

    valg = int(input("Hvem kalkulator vil du bruke? (nummer)"))  

    if valg == 0:
        pluss()

    elif valg == 1:
        minus()

    elif valg == 2:
        omkretsOgAreal()

def pluss ():
    print("Dette er pluss kalkulator")

def minus ():
    print("Dette er minus kalkulator")

def omkretsOgAreal ():
    print("Dette er en kalkulator for omkrets og areal")

    lengde = float(input("Hva er lengde på rektangelet?"))
    bredde = float(input("Hva er bredde på rektangelet?"))

    omkrets = ((lengde + bredde) * 2)
    areal = (lengde * bredde)

    print("omkrets: ", omkrets)
    print("arealet er: ", areal)    

main()