import React from "react";
import { ToolbarElement } from "./toolbarElement";
import { DragDropContainer } from "react-drag-drop-container";

export class Toolbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: []
		};

		for (let i = 0; i < props.schema.length; i++) {
			let obj = props.schema[i];
			if (!obj.canBeInstanced) continue;
			let element = {
				text: `${obj.title}`,
				id: `${i}`
			};
			this.state.elementList.push(element);
		}
	}

	createList() {
		let elementList = this.state.elementList;
		let droppableElement = elementList.map((item, index) => (
			<DragDropContainer
				targetKey="dragdrop"
				key={"draggable" + item.id}
				dragClone={true}
				dragData={{ source: "toolbar", text: item.text, id: item.id }}
			>
				<ToolbarElement text={item.text} id={item.id} />
			</DragDropContainer>
		));
		return droppableElement;
	}

	render() {
		const style = {
			//display: "inline-block",
			backgroundColor: "grey",
			textAlign: "center",
			verticalAlign: "middle",
			height: "90vh",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			//border: "3px solid",
			color: "black",
			WebkitBoxOrdinalGroup: "2", // OLD - iOS 6-, Safari 3.1-6
			MozBoxOrdinalGroup: "2", // OLD - Firefox 19-
			msFlexOrder: "2", // TWEENER - IE 10
			WebkitOrder: "2", // NEW - Chrome
			order: "2", // NEW, Spec - Opera 12.1, Firefox 20+
			WebkitBoxFlex: "1", // OLD - iOS 6-, Safari 3.1-6
			MozBoxFlex: "1", // Firefox 19-
			width: "25%", // For OLD syntax, otherwise collapses.
			msFlex: "1", // TWEENER - IE 10
			WebkitFlex: "1", // NEW - Chrome
			flex: "1" // NEW, Spec - Opera 12.1, Firefox 20+
		};
		let droppableElement = this.createList();
		return <div style={style}>{droppableElement}</div>;
	}
}
