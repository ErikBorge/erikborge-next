import Branches from "../components/tjafs/Branches/Branches";
import ImpossibleButton from "../components/tjafs/ImpossibleButton/ImpossibleButton";
import HoverLetters from "../components/tjafs/HoverLetters/HoverLetters";
import DorkySlider from "../components/DorkySlider/DorkySlider";

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
  {
    title: "Bokstaver",
    href: "bokstaver",
    renderComponent: HoverLetters,
    layoutProps: ["noPadding", "noOverflow"],
  },
  {
    title: "Slider",
    href: "slider",
    renderComponent: DorkySlider,
    layoutProps: [],
  },
];
