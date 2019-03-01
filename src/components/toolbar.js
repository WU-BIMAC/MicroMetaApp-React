import React from "react";
import Collapsible from "react-collapsible";
import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";

import ImageElement from "./imageElement";

export default class Toolbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: {}
		};
		for (let i = 0; i < props.schema.length; i++) {
			let obj = props.schema[i];
			if (obj.title === "Microscope") continue;
			let category = obj.category;
			let element = {
				id: `${obj.title}-${i}`,
				schema: obj
			};
			if (this.state.elementList[category] === undefined) {
				this.state.elementList[category] = [];
			}
			this.state.elementList[category].push(element);
		}
	}

	createCategoryItems(key) {
		let elementList = this.state.elementList;
		let imageElements = [];
		elementList[key].map(item =>
			imageElements.push(
				<ImageElement
					key={`ImageElement-${item.id}`}
					id={item.id}
					image={`${this.props.imagesPath}${item.schema.image}`}
					name={item.schema.title}
					width={100}
					height={100}
				/>
			)
		);
		let categoryItems = [];
		elementList[key].map((item, index) =>
			categoryItems.push(
				<DragDropContainer
					targetKey="canvas"
					key={"draggable" + item.id}
					dragClone={true}
					dragData={{
						source: "toolbar",
						id: item.id,
						schema: item.schema
					}}
					style={{
						width: `${
							imageElements[index].state === undefined
								? 100
								: imageElements[index].state.width
						}px`,
						height: `${
							imageElements[index].state === undefined
								? 100
								: imageElements[index].state.height
						}px`
					}}
				>
					{imageElements[index]}
				</DragDropContainer>
			)
		);
		const styleContainer = {
			flexFlow: "row wrap",
			padding: "5px",
			margin: "5px"
		};
		return <div style={styleContainer}>{categoryItems}</div>;
	}

	createCategories() {
		let elementList = this.state.elementList;
		let toolbar = [];
		const style = {
			width: "100%"
		};

		Object.keys(elementList).forEach(key => {
			toolbar.push(
				<Collapsible
					key={`Collapsible${key}`}
					trigger={
						<Button key={`Trigger${key}`} style={style} size="lg">
							{key}
						</Button>
					}
				>
					{this.createCategoryItems(key)}
				</Collapsible>
			);
		});
		return toolbar;
	}

	render() {
		const style = {
			boxSizing: "border-box",
			backgroundColor: "LightGray",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			width: "25%",
			color: "black",
			overflow: "hidden",
			OverflowEvent: "hidden",
			textAlign: "center",
			verticalAlign: "middle"
		};
		let toolbar = this.createCategories();
		return <div style={style}>{toolbar}</div>;
	}
}
