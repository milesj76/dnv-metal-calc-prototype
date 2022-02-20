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

export const results = computed(cuts, (store) => {
  return store.map((cut) => {
    // Do all the math you want to do here,
    // but for now we'll just return as a string
    return `${cut.length} × ${cut.quantity}`
  })
})

// 5. CLEAR ALL CUTS

export const clearAllCuts = () => {
  console.log('clearAllCuts');
}