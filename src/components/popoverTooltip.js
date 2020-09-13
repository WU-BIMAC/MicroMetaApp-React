import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default class PopoverTooltip extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let delay = {
			show: this.props.show,
			hide: this.props.hide,
		};
		return (
			<OverlayTrigger
				placement={this.props.position}
				delay={delay}
				rootClose={true}
				rootCloseEvent={"mousedown" || "click"}
				overlay={
					<Popover id="popover-basic">
						<Popover.Title as="h3">{this.props.title}</Popover.Title>
						<Popover.Content>{this.props.content}</Popover.Content>
					</Popover>
				}
			>
				{this.props.element}
			</OverlayTrigger>
		);
	}
}

PopoverTooltip.defaultProps = {
	show: 1000,
	hide: 1000,
	title: "A title",
	content: "Tooltip content",
	element: <button>Fake button</button>,
};
