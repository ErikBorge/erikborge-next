import Branches from "../components/tjafs/Branches/Branches";
import ImpossibleButton from "../components/tjafs/ImpossibleButton/ImpossibleButton";

export const tjafsObjects = [
  {
    title: "Greie greiner",
    href: "greie-greiner",
    renderComponent: Branches,
    layoutProps: ["noPadding", "noOverflow"],
  },
  {
    title: "Faens knapp",
    href: "faens-knapp",
    renderComponent: ImpossibleButton,
  },
];
