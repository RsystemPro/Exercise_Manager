import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RestartSVGR = (props: SvgProps) => (
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
            d="M34.1 7.002c-1.07-.056-2.1.777-2.1 1.99v3.348C20.665 14.25 12 24.13 12 36c0 13.234 10.767 24 24 24s24-10.766 24-24c0-5.67-2.015-11.172-5.672-15.494a4.001 4.001 0 0 0-6.107 5.168A16 16 0 0 1 52 36c0 8.822-7.178 16-16 16s-16-7.178-16-16c0-7.439 5.11-13.69 12-15.473v2.479c0 1.619 1.83 2.56 3.146 1.619l9.805-7.008a1.989 1.989 0 0 0 0-3.236l-9.805-7.008a1.967 1.967 0 0 0-1.046-.371z"
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
export default RestartSVGR
