import {
  FaWifi,
  FaTv,
  FaBath,
  FaParking,
  FaWind,
  FaSwimmingPool,
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { MdBalcony } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdLocalLaundryService } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaSmoking } from "react-icons/fa";
import { FaWheelchair } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineElevator } from "react-icons/md";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import { IoBonfireSharp } from "react-icons/io5";
import { MdBreakfastDining } from "react-icons/md";
import { MdVideogameAsset } from "react-icons/md";
  
  const perks = [
    { name: "Wi-Fi", icon: FaWifi },
    { name: "TV", icon: FaTv},
    { name: "Shower", icon: FaBath},
    { name: "Parking", icon: FaParking },
    { name: "Kitchen", icon: FaKitchenSet },
    { name: "Air Conditioning", icon: FaWind },
    { name: "Balcony", icon: MdBalcony },
    { name: "Gym", icon: CgGym },
    { name: "Pool", icon: FaSwimmingPool},
    { name: "Pet Friendly", icon: MdOutlinePets },
    { name: "Laundry", icon: MdLocalLaundryService},
    { name: "Workspace", icon: BsPersonWorkspace },
    { name: "Smoking Allowed", icon: FaSmoking },
    { name: "Wheelchair Accessible", icon: FaWheelchair },
    { name: "Family Friendly", icon: IoIosPeople },
    { name: "Fireplace", icon: IoBonfireSharp },
    { name: "Elevator", icon: MdOutlineElevator},
    { name: "Coffee Maker", icon:MdOutlineCoffeeMaker },
    { name: "Security System", icon: MdOutlineSecurity },
    { name: "Beach Access", icon: FaUmbrellaBeach },
    { name: "Breakfast Included", icon: MdBreakfastDining },
    { name: "Game Room", icon: MdVideogameAsset },
  ];
  
  export default perks;
