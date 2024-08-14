import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

interface AvataImgProps {
  img?: string; // Optional prop for image URL
  name?: string; // Optional prop for user's name to display initial
}

const AvataImg = ({ img, name }: AvataImgProps) => {
  return (
    <Avatar
      src={img} // If `img` is provided, use it for the Avatar
      sx={{ bgcolor: !img ? red[500] : "transparent", width: 30, height: 30 }} // Set background color if no image
      aria-label="recipe"
    >
      {!img && name?.charAt(0)} {/* Display the initial if no image */}
    </Avatar>
  );
};

export default AvataImg;
