import styled from "styled-components";

interface TagProps {
    name: string;
    size: number;
    color?: string;
}

export const Tag = ({name, size, color = '#555050'}: TagProps) => {
    return (
        <div>
            <TagText size={size} color={color}>#{name}</TagText>
        </div>
    )
}

const TagText = styled.span<{size: number, color: string}>`
    font-weight: bold;
    font-size: ${(props) => props.size}px;
    color: ${(props) => props.color};
    
`