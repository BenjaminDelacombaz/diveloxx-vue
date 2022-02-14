import { Dive } from "../models/dive.model"

let dives = [
    new Dive('St-Aubin', new Date(2021, 1, 15, 11, 30), 58, 75, ['Manu']),
    new Dive('Rivaz Minoterie', new Date(2021, 4, 7, 14, 45), 48, 65, ['Samuel']),
    new Dive('St-Aubin', new Date(2021, 5, 25, 9, 15), 55, 89, ['Manu']),
    new Dive('Rivaz Gare', new Date(2022, 1, 8, 11, 30), 35, 51, ['Manu', 'Jo']),
    new Dive('Rivaz Gare', new Date(2021, 11, 12, 12, 30), 58, 58, ['Manu']),
]
export { dives }