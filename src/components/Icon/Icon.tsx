import {IconType} from "react-icons";

interface IconProps {
    icon: IconType,
    size?: number
}

export const Icon = ({icon: IconComponent, size = 12}: IconProps) => {
    return (
        <span><IconComponent size={size} /></span>
    )
}