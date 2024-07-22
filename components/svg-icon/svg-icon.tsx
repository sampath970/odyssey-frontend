import React from "react"

interface Props {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    width?: number
    height?: number
}

const SvgIcon: React.FC<Props> = props => {
    const { Icon } = props
    return (
        <div>
            <Icon height={props.height} width={props.width} />
        </div>
    )
}
export default SvgIcon;