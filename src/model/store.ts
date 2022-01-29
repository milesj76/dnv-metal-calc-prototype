import { writable } from 'svelte/store'
import type { Cut } from './types'

const initialCuts: Cut[] = [{
   id: 0,
   length: 0,
   quantity: 0
 }]

export const cuts = writable<Cut[]>(initialCuts);

let idCounter = 0;

export const addCut = (length: number = 0, quantity: number = 0) => {
   idCounter++;

   const newCut: Cut = {
      id: idCounter,
      length,
      quantity
   }

   cuts.update(cuts => [...cuts, newCut])
}