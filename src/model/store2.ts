import { action, atom, computed } from "nanostores"
import type { Cut } from "./types"

// keep track of IDs here
// that way they're always incrementing
// prevents bugs with IDs clashing
let idCounter = 0

const initialCuts: Cut[] = [
  {
    id: 0,
    length: 0,
    quantity: 0,
  },
]

// 0. CUTS

export const cuts = atom<Cut[]>(initialCuts)

//
// 1. ADD CUT
//

export const addCut = action(cuts, "addCut", (store) => {
  // increment id
  idCounter++

  // create new cut object
  const newCutWithId: Cut = {
    id: idCounter,
    length: 0,
    quantity: 0,
  }

  // set the store to cuts + new cut
  store.set([...store.get(), newCutWithId])
})

// Here is how you would write an addCut function where you could pass in values

// Pass in strings so that we keep the number parsing logic in the store
type NewCut = {
  length: string | number
  quantity: string | number
}

export const addCutWithValues = action(
  cuts,
  "addCut",
  (store, newCut: NewCut) => {
    // increment id
    idCounter++

    // create new cut object
    const newCutWithId: Cut = {
      id: idCounter,
      length: parseNumber(newCut.length, "length"),
      quantity: parseNumber(newCut.quantity, "quantity"),
    }

    // set the store to cuts + new cut
    store.set([...store.get(), newCutWithId])
  }
)

//
// 2. REMOVE CUT
//

export const removeCut = action(cuts, "removeCut", (store, cutId: number) => {
  // filter out the cut we don't want
  store.set(store.get().filter((cut) => cut.id !== cutId))
})

//
// 3. UPDATE CUT
//

type UpdateCut = {
  id: number
} & Partial<NewCut>

export const updateCut = action(
  cuts,
  "updateCut",
  (store, updateCut: UpdateCut) => {
    const newCut: Partial<Cut> = {}

    // Steps:
    // 1. Loop through all the keys we're updating, and get the numbers
    // 2. Find the right cut & update it in the array of cuts

    // key will be "id", "length", "quantity"
    for (const key in updateCut) {
      // we can skip ID
      if (key !== "id") {
        newCut[key] = parseNumber(updateCut[key], key as NumberField)
      }
    }

    // It's okay to do a map here because we're updating an array
    // If we got to the point where there were 10k+ cuts
    // then we would "normalize" the data:
    // where we store all of the cuts in an object with the key as `id`
    store.set(
      store.get().map((cut) => {
        if (cut.id === updateCut.id) {
          return {
            ...cut, // keep existing properties
            ...newCut, // spread new object to update specific ones
          }
        } else {
          return cut
        }
      })
    )
  }
)

// Number Helpers

type NumberField = "length" | "quantity"

// Call these functions whenever you want parse/format numbers
// That way you can keep all the logic in one place
function parseNumber(value: string | number, field: NumberField) {
  if (isNaN(Number(value))) {
    console.error(`${field} is not a valid number`, value)
  }

  switch (field) {
    case "length":
      // Convert to float with 3 decimal places
      // By always converting to a string,
      // We can handle both strings & numbers, and use .toFixed()
      return parseFloat(parseFloat(`${value}`).toFixed(3))
    case "quantity":
      // Convert to int
      return parseInt(`${value}`)
    default:
      console.error(`Field: ${field} not found for value:`, value)
  }
}

// 4. RESULTS

// V1 RESULTS ( NOT ACCURATE )
export const results0 = computed(cuts, (store) => {

  // Need to show quantity of BARS needed to make all cuts
  // 4 Bars needed at 240" length

  // INPUT: 72.772" x 4 cuts
  // INPUT: 240" bar
  // INPUT: 0.187 kere
  // INPUT: $ per bar

  // OUTPUT: 240" bars x 2
  // SCRAP: x" of scrap
  // COST: $x for y bars at z length

  // How to get BARS result
  // solve with DNValgorithm
  // Sort cuts by length (long -> small)
  
  let sortedCuts = [...store].sort(function (a, b) { return b.length - a.length });
  
  // @TODO: Replace these with actual inputs
  const barLength = 240
  const kere = 0.187
  
  let totalBars = 1;

  let totalCutLength = (sortedCuts[0].quantity * sortedCuts[0].length) + (sortedCuts[0].quantity * kere)
  
  let remainingLength = barLength

  // This goes through all cuts and subtracts them from bars + totals up bars
  for (let i = 0; i < sortedCuts.length; i++) {
    for (let j = 0; j < sortedCuts[i].quantity; j++) {
      if (sortedCuts[i].length > remainingLength) {
        // Move on to next bar
        totalBars++
        remainingLength = barLength
        // TODO: Add remaining left to scrap
      }
      // Always subrtract length
      remainingLength = remainingLength - (sortedCuts[i].length + kere)
    }
    // if (sortedCuts[i].quantity === 0) continue
  }
  
  console.log("totalBars", totalBars);
  

  return store.map((cut) => {
    // Do all the math you want to do here,
    // but for now we'll just return as a string
    return `${cut.length} × ${cut.quantity}`
  })
})




// V2 RESULTS
// https://siongui.github.io/2017/04/16/css-only-transpose-html-table/
// ^^^ Invert rows and columns!

export const results = computed(cuts, (store) => {

  // Sort cuts by length
  let sortedCuts = [...store].sort(function (a, b) { return b.length - a.length });

  console.log('sortedCuts', sortedCuts);
  
  /**
   * Organize results in array
   * Because all are organized in terms of length, array values can be oganized by length
   * Each element in array will represent one bar
   * Single element = [0, 3, 0, 0, 1]
   * meta element = [barN, qtyCut1, qtyCut2, qtyCut3, qtyCut4]
   * 
   * Use the table inversion to simplify the results
   * tableArray = [bar1AndCuts, bar2AndCuts, bar3AndCuts, ...remainingCuts]
   */

  const barLength = 240;
  let totalBars = 1;
  let allBars = [];

  // I need the quantities for each cut in order of size
  // use sortedCuts in order
  let totalQuantities: number[] = [];
  for (let i = 0; i < sortedCuts.length; i++) {
    totalQuantities.push(sortedCuts[i].quantity)
  }
  console.log('totalQuantities', totalQuantities);

  // I need to start making cuts from bars
  // Create a loop that subtracts cuts that fit in a remaining bar length
  let remainingBarLength = barLength;

  function checkRemainingCuts(cutIndex) {
    let neededCuts = totalQuantities[cutIndex]
    let cutsSoFar = 0;

    // total up cuts for length @ cutIndex
    if (allBars.length > 0) {
      for (let i = 0; i < allBars.length; i++) {
        cutsSoFar = cutsSoFar + allBars[i][cutIndex];
      }
    }

    // return remaining cuts!
    return neededCuts - cutsSoFar
  }

  return store.map((cut) => {
    // Do all the math you want to do here,
    // but for now we'll just return as a string
    return `${cut.length} × ${cut.quantity}`
  })
})





// 5. CLEAR ALL CUTS

export const clearAllCuts = action(cuts, "clearAllCuts", (store) => {
  // console.log('clearAllCuts');

  // delete all the cuts
  idCounter++

  store.set([{
    id: idCounter,
    length: 0,
    quantity: 0,
  }])

})