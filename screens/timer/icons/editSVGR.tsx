import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const EditSVGR = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 256 256"
    {...props}
  >
    <Path
      fill="#fff"
      strokeMiterlimit={10}
      d="m38.406 22.234 11.36 11.36-20.982 20.982-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876zm2.828-2.828 5.234-5.234a4 4 0 0 1 5.657 0l5.703 5.703a4 4 0 0 1 0 5.657l-5.234 5.234z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(3.55556)"
    />
  </Svg>
)
export default EditSVGR